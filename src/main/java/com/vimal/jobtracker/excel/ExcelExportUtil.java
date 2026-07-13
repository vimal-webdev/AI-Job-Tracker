package com.vimal.jobtracker.excel;

import com.vimal.jobtracker.entity.JobApplication;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelExportUtil {

    public static ByteArrayInputStream applicationsToExcel(List<JobApplication> applications) {
        String[] columns = {"Job ID", "Company", "Job Role", "HR Name", "Email", "Phone", "Status", "Applied Date"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Job Applications");

            // Header Style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerCellStyle.setAlignment(HorizontalAlignment.CENTER);

            // Row for Header
            Row headerRow = sheet.createRow(0);

            // Header Cells
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
                cell.setCellStyle(headerCellStyle);
            }

            int rowIdx = 1;
            for (JobApplication app : applications) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(app.getJobId() != null ? app.getJobId() : "");
                row.createCell(1).setCellValue(app.getCompany() != null ? app.getCompany().getCompanyName() : "");
                row.createCell(2).setCellValue(app.getRole() != null ? app.getRole() : "");

                String hrName = "";
                String hrEmail = "";
                String hrPhone = "";
                if (app.getHrContact() != null) {
                    hrName = app.getHrContact().getHrName() != null ? app.getHrContact().getHrName() : "";
                    hrEmail = app.getHrContact().getEmail() != null ? app.getHrContact().getEmail() : "";
                    hrPhone = app.getHrContact().getPhone() != null ? app.getHrContact().getPhone() : "";
                }
                row.createCell(3).setCellValue(hrName);
                row.createCell(4).setCellValue(hrEmail);
                row.createCell(5).setCellValue(hrPhone);
                row.createCell(6).setCellValue(app.getStatus() != null ? app.getStatus() : "");

                if (app.getAppliedDate() != null) {
                    row.createCell(7).setCellValue(app.getAppliedDate().toString());
                } else {
                    row.createCell(7).setCellValue("");
                }
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Excel file: " + e.getMessage());
        }
    }
}

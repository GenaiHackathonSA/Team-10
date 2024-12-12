// backend/src/main/java/com/fullStack/expenseTracker/dto/requests/CreateCategoryRequest.java
package com.fullStack.expenseTracker.dto.requests;

public class CreateCategoryRequest {
    private int categoryId;
    private String categoryName;
    private int transactionTypeId;
    private boolean enabled;

    public int getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public int getTransactionTypeId() {
        return transactionTypeId;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
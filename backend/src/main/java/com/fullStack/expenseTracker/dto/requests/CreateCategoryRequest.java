// backend/src/main/java/com/fullStack/expenseTracker/dto/requests/CreateCategoryRequest.java
package com.fullStack.expenseTracker.dto.requests;

public class CreateCategoryRequest {
    private String categoryName;
    private int transactionTypeId;
    private boolean enabled;

    public int getTransactionTypeId() {
        return transactionTypeId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
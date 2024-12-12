import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserStatistics from '../pages/user/statistics'; // Adjust the import based on your structure
import { fixInfiniteLoop } from '../statistic/statistics'; // Ensure this points to the fixInfiniteLoop function path

jest.mock('../statistic/statistics'); // Mock the statistics module

describe('UserStatistics Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks
    });

    test('should not invoke API call repeatedly on page load', async () => {
        // Simulate the API response during the initial load
        fixInfiniteLoop.mockImplementation(() => Promise.resolve({ data: 'mocked data' }));

        render(<UserStatistics />);

        // Assert that the fixInfiniteLoop function is called only once during the initial load
        await waitFor(() => {
            expect(fixInfiniteLoop).toHaveBeenCalledTimes(1);
        });

        // Verify that the appropriate elements are rendered based on the mocked data
        const loadingElement = screen.getByText(/Loading/i);
        const noDataElement = screen.queryByText(/No data found!/i);
        expect(loadingElement).toBeInTheDocument();
        expect(noDataElement).not.toBeInTheDocument();
    });

    test('should handle error response gracefully', async () => {
        // Mock implementation to simulate a rejected promise (error scenario)
        fixInfiniteLoop.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

        render(<UserStatistics />);

        // Assert that the fixInfiniteLoop function is called only once
        await waitFor(() => {
            expect(fixInfiniteLoop).toHaveBeenCalledTimes(1);
            const errorElement = screen.getByText(/Failed to fetch information. Try again later!/i);
            expect(errorElement).toBeInTheDocument(); // Check if error message is displayed
        });
    });

    test('should display no data message when there is no data', async () => {
        // Simulate a response with no data
        fixInfiniteLoop.mockImplementation(() => Promise.resolve({ data: null }));

        render(<UserStatistics />);

        // Assert that the fixInfiniteLoop function is called only once
        await waitFor(() => {
            expect(fixInfiniteLoop).toHaveBeenCalledTimes(1);
            const noDataElement = screen.getByText(/No data found!/i);
            expect(noDataElement).toBeInTheDocument(); // Check if no data message is displayed
        });
    });
});

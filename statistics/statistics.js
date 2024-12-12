// statistics/statistics.js

// Function to handle the logic ensuring the API call is made only during the initial page load
export function fixInfiniteLoop() {
    // Use a ref to track whether the component has mounted
    const hasMounted = useRef(false);

    useEffect(() => {
        // Only make the API call if the component is mounting for the first time
        if (!hasMounted.current) {
            hasMounted.current = true;
            // Perform your API call here
            // fetchData(); <-- Uncomment this line when integrating with an actual API call
        }
    }, []); // Empty dependency array ensures this effect runs only once
   
    // Return any necessary value or function, if applicable
    return null; // Replace with actual return if needed
}

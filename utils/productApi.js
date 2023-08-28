export async function fetchProduct() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/products/");

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // You can rethrow the error to handle it outside this function if needed
    }
}
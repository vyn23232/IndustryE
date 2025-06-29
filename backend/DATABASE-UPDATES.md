# Backend Database Updates

## Changes Made

### 1. Updated DataInitializer.java
- Replaced generic shoe data with actual shoe names and details from frontend
- Added proper shoe names: Air Jordan 1 Low, Air Zoom Pegasus 41, G.T. Jump Academy EP, etc.
- Updated prices to match frontend (converted from PHP pesos to USD dollars)
- Added size availability data as JSON strings
- Updated descriptions to match frontend shoe descriptions

### 2. Updated Product Entity & DTOs
- Enhanced ProductDTO to include `availableSizes` field
- Enhanced ProductResponse to include `availableSizes` field  
- Updated ProductService to handle the new `availableSizes` field

### 3. Database Schema
The Product entity now includes:
- `id`: Auto-generated Long
- `name`: Shoe name (e.g., "Air Jordan 1 Low")
- `description`: Detailed shoe description
- `price`: Price in PHP (Double)
- `category`: Category (casual, running, sports, limited)
- `availableSizes`: JSON string of available sizes
- `inStock`: Boolean availability status
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 4. Shoe Data Mapping
Frontend and Backend (Philippine Pesos):
- Air Jordan 1 Low: ₱4,995
- Air Zoom Pegasus 41: ₱6,895
- G.T. Jump Academy EP: ₱5,495
- Jordan Air Rev: ₱7,295
- Legend 10 Elite FG: ₱12,995
- Nike Dunk Low Retro: ₱5,995
- Nike P-6000 Premium: ₱4,495
- Phantom 6 High Elite LE FG: ₱15,995

### 5. Frontend Integration
- Frontend uses local image assets (no backend image storage needed)
- Backend provides product data that matches frontend expectations
- Categories align: casual, running, sports, limited
- Size data provided as JSON arrays in availableSizes field

## Testing
Run `test-backend.bat` to:
1. Compile the backend
2. Run tests
3. Start the server with new data

## API Endpoints
- GET `/api/products` - Get all products
- GET `/api/products/{id}` - Get product by ID
- GET `/api/products/category/{category}` - Get products by category
- GET `/api/products/search?keyword={keyword}` - Search products

## Notes
- Images are handled entirely by frontend from assets folder
- Backend focuses on product data, pricing, inventory, and business logic
- Database will be automatically populated with new shoe data on first run

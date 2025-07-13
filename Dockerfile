# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy frontend and backend directories
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port (adjust if needed)
EXPOSE 8000

# Run the Flask app
CMD ["python", "backend/app.py"]
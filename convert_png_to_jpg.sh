#!/bin/bash

# Arrays to store folder statistics
declare -a folder_names
declare -a png_sizes
declare -a jpg_sizes

# Function to convert PNG to JPG with quality optimization
convert_png_to_jpg() {
    local png_file="$1"
    local base_name="${png_file%.*}"
    local jpg_file="${base_name}.jpg"
    local quality=80
    
    # Get original PNG size in bytes
    local png_size=$(stat -f%z "$png_file" 2>/dev/null || stat -c%s "$png_file" 2>/dev/null)
    
    echo "Processing: $png_file (${png_size} bytes)"
    
    # Convert with initial quality of 80
    convert "$png_file" -quality $quality "$jpg_file"
    
    # Get JPG size
    local jpg_size=$(stat -f%z "$jpg_file" 2>/dev/null || stat -c%s "$jpg_file" 2>/dev/null)
    
    echo "  Initial JPG (quality $quality): ${jpg_size} bytes"
    
    # If JPG is larger than PNG, reduce quality
    while [ $jpg_size -ge $png_size ] && [ $quality -gt 40 ]; do
        quality=$((quality - 10))
        echo "  Reducing quality to $quality..."
        convert "$png_file" -quality $quality "$jpg_file"
        jpg_size=$(stat -f%z "$jpg_file" 2>/dev/null || stat -c%s "$jpg_file" 2>/dev/null)
        echo "  New JPG size: ${jpg_size} bytes"
    done
    
    # Calculate size reduction
    local reduction=$((png_size - jpg_size))
    local percentage=$(echo "scale=1; ($reduction * 100) / $png_size" | bc -l)
    
    echo "  Final: PNG ${png_size} bytes -> JPG ${jpg_size} bytes (quality $quality)"
    echo "  Size reduction: ${reduction} bytes (${percentage}%)"
    echo ""
}

# Function to get folder size in bytes
get_folder_size() {
    local pattern="$1"
    local size=0
    for file in $pattern; do
        if [ -f "$file" ]; then
            local file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            size=$((size + file_size))
        fi
    done
    echo $size
}

# Function to format bytes to human readable
format_bytes() {
    local bytes=$1
    if [ $bytes -ge 1073741824 ]; then
        echo "$(echo "scale=1; $bytes / 1073741824" | bc -l)G"
    elif [ $bytes -ge 1048576 ]; then
        echo "$(echo "scale=1; $bytes / 1048576" | bc -l)M"
    elif [ $bytes -ge 1024 ]; then
        echo "$(echo "scale=1; $bytes / 1024" | bc -l)K"
    else
        echo "${bytes}B"
    fi
}

# Check if bc is available for calculations
if ! command -v bc &> /dev/null; then
    echo "Installing bc for calculations..."
    # This might need sudo, but let's try without first
    sudo apt-get update && sudo apt-get install -y bc
fi

# Base directory for images
BASE_DIR="/home/uerdna/websites/martagaiaoviana.github.io/assets/images"

# Find all directories containing PNG files
echo "=== Scanning for directories with PNG files ==="
found_dirs=()
for dir in "$BASE_DIR"/*/ "$BASE_DIR"/*/*/; do
    if [ -d "$dir" ]; then
        png_count=$(find "$dir" -maxdepth 1 -name "*.png" 2>/dev/null | wc -l)
        if [ $png_count -gt 0 ]; then
            found_dirs+=("$dir")
            echo "Found $png_count PNG files in: $dir"
        fi
    fi
done

echo ""

# Process each directory
total_png_size=0
total_jpg_size=0

for dir in "${found_dirs[@]}"; do
    dir_name=$(basename "$dir")
    parent_dir=$(basename "$(dirname "$dir")")
    
    # Create a descriptive name for nested directories
    if [ "$parent_dir" != "images" ]; then
        display_name="$parent_dir/$dir_name"
    else
        display_name="$dir_name"
    fi
    
    echo "=== Converting PNG files in $display_name directory ==="
    
    # Calculate PNG size before conversion
    png_size_before=$(get_folder_size "$dir*.png")
    
    # Convert all PNG files in this directory
    png_files_found=false
    for png_file in "$dir"*.png; do
        if [ -f "$png_file" ]; then
            png_files_found=true
            convert_png_to_jpg "$png_file"
        fi
    done
    
    if [ "$png_files_found" = true ]; then
        # Calculate JPG size after conversion
        jpg_size_after=$(get_folder_size "$dir*.jpg")
        
        # Store folder statistics
        folder_names+=("$display_name")
        png_sizes+=($png_size_before)
        jpg_sizes+=($jpg_size_after)
        
        total_png_size=$((total_png_size + png_size_before))
        total_jpg_size=$((total_jpg_size + jpg_size_after))
        
        echo "Directory $display_name: PNG $(format_bytes $png_size_before) -> JPG $(format_bytes $jpg_size_after)"
        echo ""
    fi
done

echo "=============================================="
echo "=== CONVERSION SUMMARY ==="
echo "=============================================="

# Print header
printf "%-25s %10s %10s %10s %8s\n" "Folder" "PNG Size" "JPG Size" "Saved" "% Saved"
printf "%-25s %10s %10s %10s %8s\n" "------" "--------" "--------" "-----" "-------"

# Print each folder's statistics
for i in "${!folder_names[@]}"; do
    folder="${folder_names[$i]}"
    png_size="${png_sizes[$i]}"
    jpg_size="${jpg_sizes[$i]}"
    saved=$((png_size - jpg_size))
    
    if [ $png_size -gt 0 ]; then
        percentage=$(echo "scale=1; ($saved * 100) / $png_size" | bc -l)
    else
        percentage="0.0"
    fi
    
    printf "%-25s %10s %10s %10s %7s%%\n" \
        "$folder" \
        "$(format_bytes $png_size)" \
        "$(format_bytes $jpg_size)" \
        "$(format_bytes $saved)" \
        "$percentage"
done

# Print totals
printf "%-25s %10s %10s %10s %8s\n" "------" "--------" "--------" "-----" "-------"
total_saved=$((total_png_size - total_jpg_size))
if [ $total_png_size -gt 0 ]; then
    total_percentage=$(echo "scale=1; ($total_saved * 100) / $total_png_size" | bc -l)
else
    total_percentage="0.0"
fi

printf "%-25s %10s %10s %10s %7s%%\n" \
    "TOTAL" \
    "$(format_bytes $total_png_size)" \
    "$(format_bytes $total_jpg_size)" \
    "$(format_bytes $total_saved)" \
    "$total_percentage"

echo ""
echo "Conversion completed!"
echo "Total files converted: $(find "$BASE_DIR" -name "*.jpg" -newer "$0" 2>/dev/null | wc -l)"

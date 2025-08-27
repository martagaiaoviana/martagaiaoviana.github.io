// Portfolio Image Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-nav lightbox-prev"><i class="bi bi-chevron-left"></i></span>
        <span class="lightbox-nav lightbox-next"><i class="bi bi-chevron-right"></i></span>
        <img class="lightbox-content" src="" alt="">
        <div class="lightbox-zoom-info">Scroll to zoom • Drag to pan • Double-click to reset</div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const zoomInfo = lightbox.querySelector('.lightbox-zoom-info');

    let currentImageIndex = 0;
    let portfolioImages = [];
    
    // Zoom and pan variables
    let scale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastTouchDistance = 0;

    // Initialize portfolio images array
    function initializeImages() {
        portfolioImages = Array.from(document.querySelectorAll('.portfolio-images img'));
        
        // Add click event to all portfolio images
        portfolioImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                openLightbox(index);
            });
        });
    }

    function openLightbox(index) {
        currentImageIndex = index;
        resetZoomAndPan();
        updateLightboxImage();
        updateNavigationButtons();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Show zoom info briefly
        zoomInfo.classList.add('visible');
        setTimeout(() => {
            zoomInfo.classList.remove('visible');
        }, 3000);
    }

    function resetZoomAndPan() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        isDragging = false;
        lightboxImg.classList.remove('zoomed', 'dragging');
        updateImageTransform();
    }

    function updateImageTransform() {
        lightboxImg.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`;
        
        // Update cursor based on zoom level
        if (scale > 1) {
            lightboxImg.style.cursor = isDragging ? 'grabbing' : 'grab';
            lightboxImg.classList.add('zoomed');
        } else {
            lightboxImg.style.cursor = 'grab';
            lightboxImg.classList.remove('zoomed');
        }
    }

    function updateLightboxImage() {
        if (portfolioImages[currentImageIndex]) {
            lightboxImg.src = portfolioImages[currentImageIndex].src;
            lightboxImg.alt = portfolioImages[currentImageIndex].alt;
        }
    }

    function updateNavigationButtons() {
        if (currentImageIndex <= 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentImageIndex >= portfolioImages.length - 1) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    function goToPrevious() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            resetZoomAndPan();
            updateLightboxImage();
            updateNavigationButtons();
        }
    }

    function goToNext() {
        if (currentImageIndex < portfolioImages.length - 1) {
            currentImageIndex++;
            resetZoomAndPan();
            updateLightboxImage();
            updateNavigationButtons();
        }
    }

    // Mouse wheel zoom
    lightboxImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const rect = lightboxImg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(scale * zoomFactor, 0.5), 5);
        
        if (newScale !== scale) {
            // Zoom towards mouse position
            const scaleChange = newScale / scale;
            translateX = translateX * scaleChange + mouseX * (1 - scaleChange);
            translateY = translateY * scaleChange + mouseY * (1 - scaleChange);
            scale = newScale;
            
            updateImageTransform();
        }
    });

    // Mouse drag for panning
    lightboxImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            lightboxImg.classList.add('dragging');
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging && scale > 1) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateImageTransform();
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            lightboxImg.classList.remove('dragging');
        }
    });

    // Double-click to reset zoom
    lightboxImg.addEventListener('dblclick', function(e) {
        e.preventDefault();
        resetZoomAndPan();
    });

    // Touch support for mobile
    let touches = [];
    
    lightboxImg.addEventListener('touchstart', function(e) {
        touches = Array.from(e.touches);
        
        if (touches.length === 1 && scale > 1) {
            // Single touch for panning
            isDragging = true;
            startX = touches[0].clientX - translateX;
            startY = touches[0].clientY - translateY;
        } else if (touches.length === 2) {
            // Two finger pinch for zoom
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
        }
        e.preventDefault();
    });

    lightboxImg.addEventListener('touchmove', function(e) {
        e.preventDefault();
        touches = Array.from(e.touches);
        
        if (touches.length === 1 && isDragging && scale > 1) {
            // Panning
            translateX = touches[0].clientX - startX;
            translateY = touches[0].clientY - startY;
            updateImageTransform();
        } else if (touches.length === 2) {
            // Pinch zoom
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (lastTouchDistance > 0) {
                const zoomFactor = distance / lastTouchDistance;
                const newScale = Math.min(Math.max(scale * zoomFactor, 0.5), 5);
                
                if (newScale !== scale) {
                    scale = newScale;
                    updateImageTransform();
                }
            }
            lastTouchDistance = distance;
        }
    });

    lightboxImg.addEventListener('touchend', function() {
        isDragging = false;
        lastTouchDistance = 0;
        touches = [];
    });

    // Navigation button events
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('disabled')) {
            goToPrevious();
        }
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('disabled')) {
            goToNext();
        }
    });

    // Close lightbox when clicking close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking on the background (only if not zoomed)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox && scale <= 1) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    if (!prevBtn.classList.contains('disabled')) {
                        goToPrevious();
                    }
                    break;
                case 'ArrowRight':
                    if (!nextBtn.classList.contains('disabled')) {
                        goToNext();
                    }
                    break;
                case '0':
                case 'Home':
                    resetZoomAndPan();
                    break;
            }
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetZoomAndPan();
    }

    // Initialize when DOM is ready
    initializeImages();
});

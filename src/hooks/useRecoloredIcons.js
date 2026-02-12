import { useState, useEffect } from 'react';

/**
 * Recolors a single PNG icon using the Canvas API.
 * Replaces all non-transparent pixels with the specified color.
 * Returns a base64 data URL of the recolored PNG.
 */
function recolorIcon(iconSrc, color) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Draw original icon
            ctx.drawImage(img, 0, 0);

            // Recolor: fill only non-transparent pixels with the new color
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error(`Failed to load icon: ${iconSrc}`));
        img.src = iconSrc;
    });
}

/**
 * React hook that recolors a set of PNG icons whenever the color changes.
 * @param {Object} iconSources - Map of icon names to their src paths, e.g. { email: '/icons/email.png' }
 * @param {string} color - Hex color to apply, e.g. '#ff6b6b'
 * @returns {Object} - Map of icon names to recolored data URLs (or original src while loading)
 */
export function useRecoloredIcons(iconSources, color) {
    const [recoloredIcons, setRecoloredIcons] = useState(iconSources);

    useEffect(() => {
        let cancelled = false;

        async function recolorAll() {
            const entries = Object.entries(iconSources);
            const results = await Promise.all(
                entries.map(async ([key, src]) => {
                    try {
                        const dataUrl = await recolorIcon(src, color);
                        return [key, dataUrl];
                    } catch {
                        // Fallback to original on error
                        return [key, src];
                    }
                })
            );

            if (!cancelled) {
                setRecoloredIcons(Object.fromEntries(results));
            }
        }

        recolorAll();
        return () => { cancelled = true; };
    }, [iconSources, color]);

    return recoloredIcons;
}

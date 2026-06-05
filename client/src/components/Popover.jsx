import React, { useRef, useEffect, useState } from 'react';

/**
 * Reusable Popover component for Filter/Sort modals
 * Handles positioning, click-outside detection, and smooth animations
 */
const Popover = ({
  isOpen,
  onClose,
  trigger,
  children,
  position = 'bottom-left',
  className = '',
}) => {
  const popoverRef = useRef(null);
  const triggerRef = useRef(trigger);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  // Handle click outside to close popover
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Calculate popover position and responsive sizing based on trigger element
  useEffect(() => {
    // keep triggerRef in sync if parent passes a different trigger
    triggerRef.current = trigger;

    if (!isOpen || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const popoverHeight = popoverRef.current?.offsetHeight || 300;

    const gap = 8; // gap between trigger and popover
    let top = triggerRect.bottom + gap; // default below trigger
    let left = triggerRect.left;
    let width = 320; // default width

    // Responsive: on small screens, make popover full-width with side padding
    if (window.innerWidth < 640) {
      width = window.innerWidth - 32; // 16px side padding
      left = 16;
      // position toward center vertically if there's not enough space
      if (top + popoverHeight > viewportHeight) {
        top = Math.max(16, triggerRect.top - popoverHeight - gap);
      }
    } else {
      // desktop adjustments
      // If popover goes off bottom of screen, position above
      if (top + popoverHeight > viewportHeight) {
        top = triggerRect.top - popoverHeight - gap;
      }

      // If popover goes off right edge, align to right
      if (left + width > window.innerWidth) {
        left = Math.max(8, triggerRect.right - width);
      }
    }

    setPopoverPos({ top, left, width });
  }, [isOpen]);

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Popover content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`fixed z-50 rounded-lg border border-gray-600 bg-zinc-900 shadow-lg
            backdrop-blur-sm transition-all duration-200 ease-out ${className}`}
          style={{
            top: `${popoverPos.top}px`,
            left: `${popoverPos.left}px`,
            width: `${popoverPos.width || 320}px`,
            maxWidth: 'calc(100% - 32px)'
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Popover;

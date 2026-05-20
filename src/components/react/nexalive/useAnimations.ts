import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-up animation triggered on scroll into view.
 * Usage: <div ref={ref} ...>
 */
export function useScrollFadeUp(options?: { delay?: number; duration?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: options?.y ?? 50 },
      {
        opacity: 1, y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, []);
  return ref;
}

/**
 * Staggered children animation on scroll.
 * Usage: <div ref={ref}><child/><child/></div>
 */
export function useScrollStagger(options?: { stagger?: number; y?: number; childSelector?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(options?.childSelector || ':scope > *');
    gsap.fromTo(children,
      { opacity: 0, y: options?.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: options?.stagger ?? 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, []);
  return ref;
}

/**
 * Counter animation — counts from 0 to target number.
 */
export function useCountUp(target: number, options?: { duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: options?.duration ?? 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${options?.prefix || ''}${Math.round(obj.val).toLocaleString()}${options?.suffix || ''}`;
          },
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return ref;
}

/**
 * Parallax effect — element moves slower than scroll.
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Disable parallax on mobile for performance
    if (window.innerWidth < 768) return;
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, [speed]);
  return ref;
}

/**
 * Simple intersection observer hook for basic visibility detection.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); }
    }, { threshold: 0.2, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, isInView };
}

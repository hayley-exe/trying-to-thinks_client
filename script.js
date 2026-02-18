// 1. Speculation Rules (for prefetching future navigations - modern browser feature)
const speculationRules = {
    "prefetch": [
        {
            "source": "document",
            "where": {
                "and": [
                    { "href_matches": "/*" },
                    {
                        "not": {
                            "href_matches": [
                                "/wp-*.php",
                                "/wp-admin/*",
                                "/wp-content/uploads/*",
                                "/wp-content/*",
                                "/wp-content/plugins/*",
                                "/wp-content/themes/astra/*",
                                "/*\\?(.+)"
                            ]
                        }
                    },
                    { "not": { "selector_matches": "a[rel~=\"nofollow\"]" } },
                    { "not": { "selector_matches": ".no-prefetch, .no-prefetch a" } }
                ]
            },
            "eagerness": "conservative"
        }
    ]
};

// Insert as <script type="speculationrules"> in HTML head or body
// Example usage in HTML:
// <script type="speculationrules">
//   ${JSON.stringify(speculationRules)}
// </script>

// 2. Elementor Lazy Load Background Observer
const lazyloadRunObserver = () => {
    const lazyloadBackgrounds = document.querySelectorAll(`.e-con.e-parent:not(.e-lazyloaded)`);

    const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyloadBackground = entry.target;
                if (lazyloadBackground) {
                    lazyloadBackground.classList.add('e-lazyloaded');
                }
                lazyloadBackgroundObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px 200px 0px' });

    lazyloadBackgrounds.forEach((lazyloadBackground) => {
        lazyloadBackgroundObserver.observe(lazyloadBackground);
    });
};

const events = [
    'DOMContentLoaded',
    'elementor/lazyload/observe',
];

events.forEach((event) => {
    document.addEventListener(event, lazyloadRunObserver);
});

// 3. Global config objects (from various plugins/themes)
// These are usually output inline before the main scripts load

// Astra theme config
const astra = {
    "break_point": "921",
    "isRtl": "",
    "is_scroll_to_id": "",
    "is_scroll_to_top": "",
    "is_header_footer_builder_active": "1"
};

// Starter Templates / Astra Sites preview config
const starter_templates_zip_preview = {
    "AstColorPaletteVarPrefix": "--ast-global-color-",
    "AstEleColorPaletteVarPrefix": [
        "ast-global-color-0", "ast-global-color-1", "ast-global-color-2",
        "ast-global-color-3", "ast-global-color-4", "ast-global-color-5",
        "ast-global-color-6", "ast-global-color-7", "ast-global-color-8"
    ]
};

// Elementor frontend config (core settings, breakpoints, i18n, etc.)
const elementorFrontendConfig = {
    "environmentMode": { "edit": false, "wpPreview": false, "isScriptDebug": false },
    "i18n": {
        "shareOnFacebook": "Share on Facebook",
        "shareOnTwitter": "Share on Twitter",
        "pinIt": "Pin it",
        "download": "Download",
        "downloadImage": "Download image",
        "fullscreen": "Fullscreen",
        "zoom": "Zoom",
        "share": "Share",
        "playVideo": "Play Video",
        "previous": "Previous",
        "next": "Next",
        "close": "Close",
        "a11yCarouselPrevSlideMessage": "Previous slide",
        "a11yCarouselNextSlideMessage": "Next slide",
        "a11yCarouselFirstSlideMessage": "This is the first slide",
        "a11yCarouselLastSlideMessage": "This is the last slide",
        "a11yCarouselPaginationBulletMessage": "Go to slide"
    },
    "is_rtl": false,
    "breakpoints": { "xs": 0, "sm": 480, "md": 768, "lg": 1025, "xl": 1440, "xxl": 1600 },
    "responsive": {
        "breakpoints": {
            "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true },
            "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false },
            "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true },
            "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false },
            "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false },
            "widescreen": { "label": "Widescreen", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false }
        },
        "hasCustomBreakpoints": false
    },
    "version": "3.35.5",
    "is_static": false,
    "experimentalFeatures": {
        "additional_custom_breakpoints": true,
        "container": true,
        "theme_builder_v2": true,
        "nested-elements": true,
        "home_screen": true,
        "global_classes_should_enforce_capabilities": true,
        "e_variables": true,
        "cloud-library": true,
        "e_opt_in_v4_page": true,
        "e_components": true,
        "e_interactions": true,
        "e_editor_one": true,
        "import-export-customization": true,
        "display-conditions": true,
        "form-submissions": true,
        "taxonomy-filter": true
    },
    "urls": {
        "assets": "https://www.jackbefit.com/wp-content/plugins/elementor/assets/",
        "ajaxurl": "https://www.jackbefit.com/wp-admin/admin-ajax.php",
        "uploadUrl": "https://www.jackbefit.com/wp-content/uploads"
    },
    "nonces": { "floatingButtonsClickTracking": "1c69976c3b" },
    "swiperClass": "swiper",
    "settings": { "page": [], "editorPreferences": [] },
    "kit": {
        "active_breakpoints": ["viewport_mobile", "viewport_tablet"],
        "global_image_lightbox": "yes",
        "lightbox_enable_counter": "yes",
        "lightbox_enable_fullscreen": "yes",
        "lightbox_enable_zoom": "yes",
        "lightbox_enable_share": "yes",
        "lightbox_title_src": "title",
        "lightbox_description_src": "description"
    },
    "post": { "id": 97, "title": "Home%20-%20Jack%20Be%20Fit", "excerpt": "", "featuredImage": false }
};

// Elementor Pro config
const ElementorProFrontendConfig = {
    "ajaxurl": "https://www.jackbefit.com/wp-admin/admin-ajax.php",
    "nonce": "8d5a09ca86",
    "urls": {
        "assets": "https://www.jackbefit.com/wp-content/plugins/elementor-pro/assets/",
        "rest": "https://www.jackbefit.com/wp-json/"
    },
    "shareButtonsNetworks": {
        "facebook": { "title": "Facebook", "has_counter": true },
        "twitter": { "title": "Twitter" },
        // ... (truncated for brevity - full list in original)
        "threads": { "title": "Threads" }
    },
    "facebook_sdk": { "lang": "en_US", "app_id": "" },
    "lottie": { "defaultAnimationUrl": "https://www.jackbefit.com/wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json" }
};

// WPForms settings (validation messages, currency, etc.)
const wpforms_settings = {
    "val_required": "This field is required.",
    "val_email": "Please enter a valid email address.",
    "val_email_suggestion": "Did you mean {suggestion}?",
    "val_email_suggestion_title": "Click to accept this suggestion.",
    "val_email_restricted": "This email address is not allowed.",
    "val_number": "Please enter a valid number.",
    "val_number_positive": "Please enter a valid positive number.",
    "val_minimum_price": "Amount entered is less than the required minimum.",
    "val_confirm": "Field values do not match.",
    "val_checklimit": "You have exceeded the number of allowed selections: {#}.",
    "val_limit_characters": "{count} of {limit} max characters.",
    "val_limit_words": "{count} of {limit} max words.",
    "val_recaptcha_fail_msg": "Google reCAPTCHA verification failed, please try again later.",
    "val_turnstile_fail_msg": "Cloudflare Turnstile verification failed, please try again later.",
    "val_inputmask_incomplete": "Please fill out the field in required format.",
    "uuid_cookie": "",
    "locale": "en",
    "country": "",
    "country_list_label": "Country list",
    "wpforms_plugin_url": "https://www.jackbefit.com/wp-content/plugins/wpforms-lite/",
    "gdpr": "",
    "ajaxurl": "https://www.jackbefit.com/wp-admin/admin-ajax.php",
    "mailcheck_enabled": "1",
    "mailcheck_domains": [],
    "mailcheck_toplevel_domains": ["dev"],
    "is_ssl": "1",
    "currency_code": "USD",
    "currency_thousands": ",",
    "currency_decimals": "2",
    "currency_decimal": ".",
    "currency_symbol": "$",
    "currency_symbol_pos": "left",
    "val_requiredpayment": "Payment is required.",
    "val_creditcard": "Please enter a valid credit card number.",
    "error_updating_token": "Error updating token. Please try again or contact support if the issue persists.",
    "network_error": "Network error or server is unreachable. Check your connection or try again later.",
    "token_cache_lifetime": "86400",
    "hn_data": []
};

// 4. IE hashchange polyfill (for accessibility/focus on anchor links)
if (/(trident|msie)/i.test(navigator.userAgent) && document.getElementById && window.addEventListener) {
    window.addEventListener("hashchange", function () {
        const hash = location.hash.substring(1);
        if (/^[A-z0-9_-]+$/.test(hash)) {
            const element = document.getElementById(hash);
            if (element) {
                if (/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                    // already focusable
                } else {
                    element.tabIndex = -1;
                }
                element.focus();
            }
        }
    }, false);
}

// Optional: If you want to run lazy observer immediately (in case DOMContentLoaded already fired)
if (document.readyState !== 'loading') {
    lazyloadRunObserver();
}
window.klaroConfig = {
    privacyPolicy: '/datenschutzerklaerung/',
    columnLayout: false,
    groupServices: true,
    mustConsent: false, // Теперь false, так как на сайте нет куки, требующих согласия
    translations: {
        de: {
            consentModal: {
                title: 'Datenschutzeinstellungen',
                description: 'Diese Webseite verwendet nur technisch notwendige Funktionen, um eine optimale Performance zu gewährleisten.',
            },
            purposes: {
                technical: 'Technisch notwendig',
            },
        },
    },
    services: [
        // Мы оставляем пустой список или только технические сервисы, 
        // чтобы Google не видел никаких упоминаний аналитики.
    ],
};
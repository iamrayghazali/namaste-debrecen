import {translations} from '../translations'

export default function Footer({language}) {
    const t = translations[language]
    const year = new Date().getFullYear()

    return (
        <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-dark-gray text-light-gray/70 text-center text-xs sm:text-sm">
            <p>
                &copy; {year} {t.footer.copyright}
            </p>
            <p className="mt-1">
                {t.footer.madeBy}{' '}
                <a
                    href="https://ghazaliray.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-light-gray transition-colors duration-200"
                >
                    ghazaliray.com
                </a>
                {' · '}
                <a href="#home" className="underline hover:text-light-gray transition-colors duration-200">
                    {t.footer.backToTop}
                </a>
            </p>
        </footer>
    )
}

import { translations } from '../translations'

export default function About({ language }) {
    const t = translations[language]

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content - Left on desktop, top on mobile */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            About Us
                        </h2>
                        <p className="text-lg text-text-primary mb-4 leading-relaxed">
                            Welcome to our spa sanctuary. We believe in the power of relaxation and holistic wellness.
                            Our team of experienced therapists is dedicated to providing you with the ultimate rejuvenation experience.
                        </p>
                        <p className="text-lg text-text-primary leading-relaxed">
                            From traditional massages to modern wellness treatments, we offer a wide range of services
                            designed to restore your mind, body, and spirit. Step into our peaceful environment and
                            let us help you find your inner balance.
                        </p>
                    </div>

                    {/* Image - Right on desktop, bottom on mobile */}
                    <div className="order-1 lg:order-2">
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=600&fit=crop"
                            alt="Spa treatment"
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
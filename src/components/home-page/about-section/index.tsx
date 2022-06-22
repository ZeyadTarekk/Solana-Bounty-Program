import Card from 'components/common/card';
const AboutSection = () => (
    <section
        title="about"
        className=" mt-36 flex bg-black px-4 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48"
    >
        <div className="absolute order-2 -mt-36 ml-7 w-3/4 opacity-75 bg-blend-overlay md:relative md:-ml-52 md:mt-0 md:w-1/2">
            <img src="/back.webp" alt="" />
        </div>

        <div className="order-1 my-auto flex h-auto flex-col">
            <Card
                headerText="What are Bounties?"
                bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ad sed adipiscing volutpat tincidunt amet vulputate porta est."
                buttonText="Learn More"
                shadowSize="md"
            />
        </div>
    </section>
);

export default AboutSection;

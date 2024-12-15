import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & share 
                <br className="md:block"/>
                <span className="head_text orange_gradient text-center">
                    AI-Powered prompts
                </span>
                <p className="desc text-center">
                    Promptopia is  open-source AI prompting 
                    tool for modern world to discover, create 
                    nd share creative prompts
                </p>
            </h1>
            
            <Feed />
        </section>
    )
}

export default Home;
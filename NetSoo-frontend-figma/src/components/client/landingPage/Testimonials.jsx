import Image from "next/image";
import Marquee from "react-fast-marquee";

const Testimonials = () => {
  const logos = [
    { id: "logo1", name: "logoipsum", image: "/client/logo1.svg" },
    { id: "logo2", name: "loop", image: "/client/logo2.svg" },
    { id: "logo3", name: "ipsum", image: "/client/logo3.svg" },
    { id: "logo4", name: "logo", image: "/client/logo4.svg" },
    { id: "logo5", name: "logoipsum", image: "/client/logo1.svg" },
    { id: "logo6", name: "loop", image: "/client/logo2.svg" },
    { id: "logo7", name: "ipsum", image: "/client/logo3.svg" },
    { id: "logo8", name: "logo", image: "/client/logo4.svg" },
  ];

  const testimonials = [
    {
      id: "1",
      name: "Samantha R.",
      title: "Founder",
      rating: 4.9,
      quote: "NetSoo changed everything.",
      description:
        "I used to spend hours every week bouncing between Excel sheets, AI tools, and scheduling platforms – and still had no clue if what I was posting actually worked. NetSoo changed everything. I now plan, optimize, and analyze all in one place. It doesn't just save me time – it saves my sanity. I've seen a 300% increase in engagement within the first month.",
      image: "/dashboard/dummy-image.jpg",
    },
    {
      id: "2",
      name: "Diego L.",
      title: "Marketing Strategist",
      rating: 4.9,
      quote: "Finally, an AI tool that thinks like a marketer.",
      description:
        "I've tested countless AI tools that generate posts with no strategy or insight. NetSoo actually understands what works and why. Its virality prediction feature is mind-blowingly accurate – we now pre-validate content before it ever goes live. No more guesswork. This is the future of marketing.",
      image: "/dashboard/dummy-image.jpg",
    },
    {
      id: "3",
      name: "Elena G.",
      title: "Freelancer & Content Creator",
      rating: 4.9,
      quote: "NetSoo feels like having a full team - without the payroll.",
      description:
        "As a one-woman business, I can't afford to hire a strategist, analyst, and designer. With NetSoo, I don't need to. It helps me generate smart ideas, adapt them to each platform, and track performance with zero stress. It's given me back my time, confidence, and creative energy.",
      image: "/dashboard/dummy-image.jpg",
    },
    {
      id: "4",
      name: "Martin H.",
      title: "Owner, Local Cafe Chain",
      rating: 4.9,
      quote: "From overwhelmed to organized in one week.",
      description:
        "Social media was a daily headache. Posting was random and results were unpredictable. NetSoo helped me build a full content calendar in minutes, tailor posts for each platform, and finally understand what content drives foot traffic. My business feels modern again.",
      image: "/dashboard/dummy-image.jpg",
    },
    {
      id: "5",
      name: "Lucia M.",
      title: "E-commerce Founder",
      rating: 4.9,
      quote: "I was going to quit Instagram. Then I found NetSoo.",
      description:
        "I had almost given up. The algorithm felt impossible to beat, and I had no idea what to post. NetSoo helped me rebuild from scratch. The AI doesn't just generate content – it gives you a strategy. Sales are up, my brand looks professional, and I'm in love with marketing again.",
      image: "/dashboard/dummy-image.jpg",
    },
    {
      id: "6",
      name: "Jake T.",
      title: "Head of Digital, UrbanLab Media",
      rating: 4.9,
      quote: "This isn't just a tool – it's a competitive edge.",
      description:
        "We tested NetSoo with a few clients and immediately rolled it out across the board. Its AI suggestions are spot-on, the analytics are insightful without being overwhelming, and the virality score is eerily accurate.",
      image: "/dashboard/dummy-image.jpg",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.56866 0.736211C8.76184 0.40672 9.23816 0.406721 9.43134 0.736213L11.8095 4.79268C11.88 4.91293 11.9975 4.99828 12.1337 5.02817L16.7265 6.03646C17.0996 6.11836 17.2468 6.57138 16.9931 6.85691L13.8701 10.3722C13.7775 10.4764 13.7326 10.6146 13.7463 10.7533L14.2066 15.4329C14.244 15.813 13.8586 16.093 13.5087 15.94L9.20032 14.0561C9.07261 14.0002 8.92739 14.0002 8.79968 14.0561L4.49134 15.94C4.14139 16.093 3.75603 15.813 3.79342 15.4329L4.25375 10.7533C4.26739 10.6146 4.22252 10.4764 4.12994 10.3722L1.00692 6.85691C0.753246 6.57138 0.900439 6.11836 1.2735 6.03646L5.86634 5.02817C6.00248 4.99828 6.11996 4.91293 6.19046 4.79268L8.56866 0.736211Z"
              fill="#DDAB2E"
            />
          </svg>
        ))}
        <span className="ml-2 mt-1 text-sm text-[#FFFFFFB2]">{rating}</span>
      </div>
    );
  };

  return (
    <div className="py-10 px-4 ">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Trusted by modern marketers <br /> creators, and teams.
      </h2>
      <Marquee pauseOnHover={true} gradient={false} speed={40} className="mb-8">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="mx-8 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Image
              src={logo.image || "/placeholder.svg"}
              alt={logo.name}
              width={100}
              height={30}
            />
          </div>
        ))}
      </Marquee>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[#FFFFFF05] backdrop-blur-[111.51px] rounded-[12px] p-6 border border-[#FFFFFF30]"
          >
            <div className="flex items-center mb-3">
              <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden mr-3">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {testimonial.name}
                </h3>
                <p className="text-[#FFFFFFB2] text-md">{testimonial.title}</p>
              </div>
            </div>

            {renderStars(testimonial.rating)}

            <p className="text-white text-md leading-relaxed">
              &quot;
              {testimonial.quote}&quot;
            </p>
            <p className="text-[#FFFFFFB2] text-md">
              {testimonial.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button 
        className="bg-[#3570BC] hover:bg-blue-600 text-white text-lg font-medium px-14 py-4 rounded-full inline-block transition duration-300 "
        >
          View All testimonials
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, ImageIcon } from "lucide-react";

const eventsData = [
  {
    date: "15 जनवरी 2025",
    title: "प्रातःकालीन शाखा",
    count: 45,
    description: "रॉक गार्डन में नियमित प्रातःकालीन शाखा का आयोजन। सूर्योदय के समय प्रार्थना, व्यायाम और बौद्धिक चर्चा।",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
  },
  {
    date: "12 जनवरी 2025",
    title: "विशेष बौद्धिक वर्ग",
    count: 38,
    description: "स्वामी विवेकानंद जी की जयंती पर विशेष बौद्धिक वर्ग का आयोजन। युवाओं के लिए प्रेरणादायक चर्चा।",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop",
  },
  {
    date: "10 जनवरी 2025",
    title: "सामूहिक खेल प्रतियोगिता",
    count: 52,
    description: "शारीरिक शक्ति और टीम भावना विकसित करने के लिए विभिन्न खेलों का आयोजन।",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
  },
  {
    date: "5 जनवरी 2025",
    title: "साप्ताहिक मिलन",
    count: 41,
    description: "सभी स्वयंसेवकों का साप्ताहिक मिलन। संगठन की गतिविधियों की समीक्षा और भविष्य की योजनाएं।",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">शाखा कार्यक्रम</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा की दैनिक गतिविधियाँ और विशेष आयोजन
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {eventsData.map((event, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-saffron transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10"></div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      <Calendar className="w-3 h-3 mr-1" />
                      {event.date}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-primary">{event.title}</h3>
                    <Badge variant="secondary" className="ml-2">
                      <Users className="w-3 h-3 mr-1" />
                      {event.count} सदस्य
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ImageIcon className="w-4 h-4 mr-2 text-primary" />
                    <span>फोटो उपलब्ध</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <p className="text-muted-foreground mb-2">
              नियमित शाखा में भाग लेने के लिए
            </p>
            <p className="text-xl font-bold text-primary">
              प्रतिदिन प्रातः 6:00 बजे, रॉक गार्डन
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Events;

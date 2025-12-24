import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, ImageIcon, Clock } from "lucide-react";

const futureEventsData = [
{
    "date": "03 दिसंबर 2025",
    "title": "पंच परिवर्तन कार्यक्रम — व्यापक गृह संपर्क अभियान की बैठक",
    "count": 0,
    "description": "राष्ट्रीय स्वयंसेवक संघ के 100 वर्ष पूर्ण होने के उपलक्ष्य में आयोजित 'पंच परिवर्तन' हेतु व्यापक गृह संपर्क अभियान की आगामी कार्ययोजना, प्रशिक्षण सत्र और विस्तृत चर्चा के लिए बैठक आयोजित की गई है। यह बैठक **बुधवार, 3 दिसंबर 2025 को शाम 7 बजे, C ब्लॉक मंदिर में नगर कार्यवाह— श्री हरीश चौहान जी के नेतृत्व में** होगी। सभी अपेक्षित टोली प्रमुख तथा टोली सदस्य अनिवार्य रूप से उपस्थित रहें।",
    "image": "/assets/img/vyapak-grah-sampark-1.png"
  }
];

const eventsData = [
  {
    date: "15 नवंबर 2025",
    title: "सहभोज कार्यक्रम",
    count: 17,
    description:
      "15 नवंबर 2025 को श्री रवि गाबा जी के निवास (रॉक गार्डन के समीप) में सहभोज कार्यक्रम का स्नेहमय आयोजन किया गया। रात्रि 8 बजे प्रारंभ हुए इस कार्यक्रम में सभी स्वयंसेवकों ने परिवार भाव से सहभागिता की। कार्यक्रम की विशेष शोभा जिला प्रचारक श्री कपिल जी की पावन उपस्थिति से बढ़ी। सहभोज की इस परंपरा ने स्वयंसेवकों के मध्य भाईचारा, समानता और सामाजिक समरसता की भावना को और सुदृढ़ किया। सभी ने अपने भोजन सहित सम्मिलित होकर संघ भाव, सौहार्द और साझा दायित्वबोध को आत्मसात किया। सांस्कृतिक गीत, सौहार्दपूर्ण चर्चा और एकत्र भोजन ने वातावरण को अत्यंत मधुर एवं प्रेरणादायी बनाया। यह आयोजन 'संघे शक्तिः' की भावनाओं को स्मरण कराने वाला सफल एवं मंगलमय सहभोज रहा।",
    image: "/assets/img/sahbhoj.png",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            शाखा कार्यक्रम
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा की दैनिक गतिविधियाँ और विशेष आयोजन
          </p>
        </div>

        {/* =========================== */}
        {/* ⭐ FUTURE EVENTS SECTION ⭐ */}
        {/* =========================== */}
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          आगामी कार्यक्रम
        </h2>

        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {futureEventsData.length === 0 ? (
            <p className="text-center text-muted-foreground">
              कोई आगामी कार्यक्रम नहीं है।
            </p>
          ) : (
            futureEventsData.map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-saffron transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10"></div>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-white/90 text-primary hover:bg-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.date}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-primary">
                        {event.title}
                      </h3>
                      <Badge variant="secondary" className="ml-2">
                        <Users className="w-3 h-3 mr-1" />
                        अपेक्षित उपस्थिति
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
            ))
          )}
        </div>

        {/* =========================== */}
        {/* ⭐ PAST EVENTS SECTION ⭐ */}
        {/* =========================== */}
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          गत कार्यक्रम
        </h2>

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
                    <h3 className="text-2xl font-bold text-primary">
                      {event.title}
                    </h3>
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

        {/* Footer Card */}
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

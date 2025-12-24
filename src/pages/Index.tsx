import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mb-8 shadow-saffron">
              <span className="text-white font-bold text-5xl">ॐ</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              राष्ट्रीय स्वयंसेवक संघ
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-6">
              चाणक्य शाखा
            </h2>
            <div className="flex items-center justify-center text-xl text-muted-foreground mb-8">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <span>रॉक गार्डन, पटेल नगर, दिल्ली</span>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              राष्ट्र सेवा के लिए समर्पित स्वयंसेवकों का संगठन
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule">
                <Button size="lg" className="text-lg px-8 py-6 shadow-saffron hover:shadow-lg transition-all">
                  दैनिक कार्यसूची देखें
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10">
                  कार्यक्रम देखें
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-saffron transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">शाखा समय</h3>
              <p className="text-muted-foreground mb-2">प्रातः: 7:00 - 8:00</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-saffron transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-accent">सदस्य संख्या</h3>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">नियमित स्वयंसेवक</p>
              <Link to="/list" className="text-primary hover:underline font-semibold">
                देखें →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-saffron transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">साप्ताहिक मिलन</h3>
              <p className="text-muted-foreground mb-2">रविवार</p>
              {/* <p className="text-muted-foreground">विशेष कार्यक्रम</p> */}
            </CardContent>
          </Card>

          {/* <Card className="hover:shadow-saffron transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-accent">संपर्क सूची</h3>
              <p className="text-muted-foreground mb-2">सभी सदस्यों की</p>
              <Link to="/list" className="text-primary hover:underline font-semibold">
                देखें →
              </Link>
            </CardContent>
          </Card> */}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              हमारे बारे में
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              चाणक्य शाखा राष्ट्रीय स्वयंसेवक संघ की एक सक्रिय इकाई है जो पटेल नगर, दिल्ली क्षेत्र में 
              राष्ट्रीय चेतना और सामाजिक एकता के लिए कार्य करती है।
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              हम नियमित शारीरिक प्रशिक्षण, बौद्धिक विकास और सामाजिक सेवा के माध्यम से 
              एक मजबूत और संगठित समाज के निर्माण में योगदान देते हैं।
            </p>
            <Link to="/hierarchy">
              <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary/10">
                संगठन देखें
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">ॐ</span>
          </div>
          <p className="text-muted-foreground mb-2">
            राष्ट्रीय स्वयंसेवक संघ - चाणक्य शाखा
          </p>
          <p className="text-sm text-muted-foreground">
            रॉक गार्डन, पटेल नगर, दिल्ली
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

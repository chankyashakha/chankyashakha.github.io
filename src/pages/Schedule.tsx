import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Sun } from "lucide-react";

const scheduleData = {
  morning: [
    { time: "07:00 - 07:05", activity: "ध्वजारोहण", icon: Sun },
    { time: "07:05 - 07:15", activity: "एकात्म स्तोत्र, एकात्म मंत्र", icon: Sun },
    { time: "07:15 - 07:40", activity: "शारीरिक व्यायाम और सूर्य नमस्कार", icon: Sun },
    { time: "07:40 - 07:45", activity: "समता", icon: Sun },
    { time: "07:45 - 07:50", activity: "खेल और सामूहिक गतिविधियाँ", icon: Sun },
    { time: "07:50 - 07:55", activity: "बौद्धिक चर्चा", icon: Sun },
    { time: "07:55 - 08:00", activity: "प्रार्थना और विकिर", icon: Sun },
  ],
};

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      {/* Page Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            प्रातःकालीन शाखा कार्यसूची
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा की नियमित प्रातःकालीन गतिविधियाँ
          </p>

          <div className="flex items-center justify-center mt-4 text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span className="font-medium">रॉक गार्डन, पटेल नगर, दिल्ली</span>
          </div>
        </div>

        {/* Morning Schedule Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="hover:shadow-saffron transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center text-2xl">
                <Sun className="w-6 h-6 mr-3 text-primary" />
                प्रातःकालीन गतिविधियाँ
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-4">
                {scheduleData.morning.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />

                    <div className="flex-1">
                      <p className="font-semibold text-primary mb-1">{item.time}</p>
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center space-y-4">
          <Card className="inline-block p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-lg text-muted-foreground mb-4">
              शाखा में भाग लेने के लिए स्वागत है
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">संपर्क करें</p>
              <p className="text-muted-foreground">
                अधिक जानकारी के लिए शाखा कार्यवाह से संपर्क करें
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

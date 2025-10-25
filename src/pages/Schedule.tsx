import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Sun, Moon } from "lucide-react";

const scheduleData = {
  morning: [
    { time: "06:00 - 06:15", activity: "प्रार्थना और ध्वजारोहण", icon: Sun },
    { time: "06:15 - 06:45", activity: "शारीरिक व्यायाम और सूर्य नमस्कार", icon: Sun },
    { time: "06:45 - 07:15", activity: "खेल और सामूहिक गतिविधियाँ", icon: Sun },
    { time: "07:15 - 07:30", activity: "बौद्धिक चर्चा", icon: Sun },
    { time: "07:30 - 07:45", activity: "प्रार्थना और विसर्जन", icon: Sun },
  ],
  evening: [
    { time: "17:00 - 17:15", activity: "संध्या प्रार्थना", icon: Moon },
    { time: "17:15 - 17:45", activity: "शारीरिक व्यायाम", icon: Moon },
    { time: "17:45 - 18:15", activity: "खेल प्रतियोगिता", icon: Moon },
    { time: "18:15 - 18:30", activity: "समूह चर्चा", icon: Moon },
  ],
  weekly: [
    { day: "रविवार", activity: "विशेष बौद्धिक वर्ग" },
    { day: "बुधवार", activity: "सामूहिक मिलन" },
    { day: "शुक्रवार", activity: "खेल प्रतियोगिता दिवस" },
  ],
};

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">दैनिक कार्यसूची</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा की नियमित गतिविधियों का समय
          </p>
          <div className="flex items-center justify-center mt-4 text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span className="font-medium">रॉक गार्डन, पटेल नगर, दिल्ली</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
          {/* Morning Schedule */}
          <Card className="hover:shadow-saffron transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center text-2xl">
                <Sun className="w-6 h-6 mr-3 text-primary" />
                प्रातःकालीन शाखा
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

          {/* Evening Schedule */}
          <Card className="hover:shadow-saffron transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
              <CardTitle className="flex items-center text-2xl">
                <Moon className="w-6 h-6 mr-3 text-accent" />
                सायंकालीन शाखा
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {scheduleData.evening.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Clock className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-accent mb-1">{item.time}</p>
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Events */}
        <Card className="max-w-5xl mx-auto hover:shadow-saffron transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-2xl">साप्ताहिक विशेष कार्यक्रम</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {scheduleData.weekly.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <p className="text-xl font-bold text-primary mb-2">{item.day}</p>
                  <p className="text-muted-foreground">{item.activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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

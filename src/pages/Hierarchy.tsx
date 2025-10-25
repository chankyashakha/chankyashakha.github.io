import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const hierarchyData = [
  {
    position: "शाखा कार्यवाह",
    name: "श्री मुरलीधर जी",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    position: "शाखा मुख्य शिक्षक",
    name: "श्री उमेश जी",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    position: "गण शिक्षक",
    name: "रवि चन्द्र जी",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    position: "घटनायक",
    name: "सुभाष जी",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
];

const Hierarchy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">शाखा संगठन</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा के प्रमुख पदाधिकारी
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hierarchyData.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-saffron transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-30"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                      {member.position}
                    </p>
                    <h3 className="text-2xl font-bold text-foreground">
                      {member.name}
                    </h3>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-lg text-muted-foreground mb-2">
              संघ की शक्ति हमारी एकता में है
            </p>
            <p className="text-2xl font-bold text-primary">
              राष्ट्रीय स्वयंसेवक संघ
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hierarchy;

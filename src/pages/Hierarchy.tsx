import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const hierarchyData = [
  {
    level: 1,
    title: "शाखा कार्यवाह",
    members: [
      {
        position: "शाखा कार्यवाह",
        name: "श्री मुरलीधर जी",
        image: "/assets/img/dhwaj.jpeg",
      },
    ],
  },
  {
    level: 2,
    title: "शाखा मुख्य शिक्षक",
    members: [
      {
        position: "शाखा मुख्य शिक्षक",
        name: "श्री उमेश जी",
        image: "/assets/img/dhwaj.jpeg",
      },
    ],
  },
  {
    level: 3,
    title: "गण शिक्षक",
    members: [
      {
        position: "गण शिक्षक",
        name: "रवि चन्द्र जी",
        image: "/assets/img/dhwaj.jpeg",
      },
    ],
  },
  {
    level: 4,
    title: "घटनायक",
    members: [
      {
        position: "घटनायक",
        name: "सुभाष जी",
        image: "/assets/img/dhwaj.jpeg",
        swyamSewaks: [
          { position: "स्वयं सेवक", name: "धीरज जी", image: "/assets/img/dhwaj.jpeg" },
          { position: "स्वयं सेवक", name: "देव चन्दर जी", image: "/assets/img/dhwaj.jpeg" },
        ]
      },
      {
        position: "घटनायक",
        name: "रवि जी",
        image: "/assets/img/dhwaj.jpeg",
        swyamSewaks: [
          { position: "स्वयं सेवक", name: "संजय जी", image: "/assets/img/dhwaj.jpeg" },
          { position: "स्वयं सेवक", name: "सुशील पंडित जी", image: "/assets/img/dhwaj.jpeg" },
        ]
      },
      // More Ghat Nayaks can go here
    ],
  }
];

const Hierarchy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            शाखा संगठन
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            चाणक्य शाखा के प्रमुख पदाधिकारी
          </p>
        </div>

        {/* Hierarchy Levels */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {hierarchyData.map((levelData, index) => (
            <div key={index} className="space-y-6">
              
              {/* Level Header */}
              <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
                {levelData.title}
              </h2>

              {/* Members in this level */}
              <div  className={`grid gap-8 justify-center ${
                levelData.level <= 3
                  ? "grid-cols-1 sm:grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}>
                {levelData.members.map((member, idx) => (
                  <Card
                    key={idx}
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

                        <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                          {member.position}
                        </p>

                        <h3 className="text-2xl font-bold text-foreground">
                          {member.name}
                        </h3>
                      </div>

                      <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>

                      {/* Show Swyam Sewaks in a list under Ghat Nayak */}
                      {member.swyamSewaks && (
                        <div className="space-y-4 pt-6">
                          <h3 className="text-xl font-bold text-center text-primary">स्वयं सेवक</h3>
                          <div className="space-y-3">
                            {member.swyamSewaks.map((swyamSewak, swyamIdx) => (
                              <div key={swyamIdx} className="flex items-start space-x-3 border-b pb-2 last:border-b-0 last:pb-0">
                                <img
                                  src={swyamSewak.image}
                                  alt={swyamSewak.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-sm font-semibold text-primary">
                                    {swyamSewak.position}
                                  </p>
                                  <h4 className="text-base font-bold text-foreground">
                                    {swyamSewak.name}
                                  </h4>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="mt-20 text-center">
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

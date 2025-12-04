import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, ChevronDown, Award } from "lucide-react";
import React, { useState } from 'react'; // useState हुक का उपयोग टैब प्रबंधन के लिए किया गया है

// --- डेटा संरचना (Refactored Data Structure) ---
const vgsAbhiyanData = [
  // --- काली माता मंदिर बस्ती ---
  {
    bastiName: "काली माता मंदिर",
    bastiEnglishName: "Kali Mata Mandir",
    leadership: {
      title: "बस्ती नेतृत्व: काली माता मंदिर",
      campaignHead: [
        {
          position: "अभियान प्रमुख",
          name: "श्री रवि गाबा", 
          image: "/assets/img/dhwaj.jpeg",
        },
        {
          position: "सह अभियान प्रमुख",
          name: "रवि चन्दर झा",
          image: "/assets/img/dhwaj.jpeg",
        },
      ],
      implementationTeam: [
        {
          position: "क्रियान्वयन टोली सदस्य",
          name: "शिवानी लांबा",
          image: "/assets/img/dhwaj.jpeg",
        },
      ],
    },
    tolis: [
        {
    toliName: "8 Block",
    members: [
      { position: "टोली प्रमुख", name: "डॉ मेहता", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "मणि अनेजा", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "लीना आनंद सूरी", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "सुनील मल्होत्रा", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "एन के मेहता", image: "/assets/img/dhwaj.jpeg" }
    ]
  },
  {
    toliName: "12 Block",
    members: [
      { position: "टोली प्रमुख", name: "राहुल सचदेवा", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "नीरज मग्गो", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "दीपक आनंद", image: "/assets/img/dhwaj.jpeg" }
    ]
  },

  {
    toliName: "18 Block",
    members: [
      { position: "टोली प्रमुख", name: "सुरेश आनंद", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "जगदंबा प्रसाद", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "सुनीता गौबा", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "योगेश गेरा", image: "/assets/img/dhwaj.jpeg" }
    ]
  },

    {
    toliName: "21 Block",
    members: [
      { position: "टोली प्रमुख", name: "जनार्दन झा", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "दीपांशु", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "देव चन्दर झा", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "मनोज", image: "/assets/img/dhwaj.jpeg" },
    ]
  },



  {
    toliName: "24 Block",
    members: [
      { position: "टोली प्रमुख", name: "महेश शर्मा", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "सुभाष चंद्र लूथरा", image: "/assets/img/dhwaj.jpeg" }
    ]
  },

    {
    toliName: "25 Block",
    members: [
      { position: "टोली प्रमुख", name: "बिट्टू दाल", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "उमेश सूरी", image: "/assets/img/dhwaj.jpeg" },
      { position: "टोली सदस्य", name: "मोनिका ढल", image: "/assets/img/dhwaj.jpeg" }
    ]
  },

  {
    toliName: "26 Block",
    members: [
      { position: "टोली प्रमुख", name: "योगेश शर्मा", image: "/assets/img/dhwaj.jpeg" },
      { position: "सह टोली प्रमुख", name: "बलबीर शर्मा", image: "/assets/img/dhwaj.jpeg" }
    ]
  },


  {
    toliName: "महिला शक्ति",
    members: [
      { position: "महिला शक्ति टोली सदस्य", name: "अनुराधा", image: "/assets/img/dhwaj.jpeg" },
      { position: "महिला शक्ति टोली सदस्य", name: "आशा", image: "/assets/img/dhwaj.jpeg" },
      { position: "महिला शक्ति टोली सदस्य", name: "नीतू यादव", image: "/assets/img/dhwaj.jpeg" },
      { position: "महिला शक्ति टोली सदस्य", name: "रेनू आनंद", image: "/assets/img/dhwaj.jpeg" },
    ]
  }
],
  },
  
  // // --- सावन भादो बस्ती ---
  // {
  //   bastiName: "सावन भादो",
  //   bastiEnglishName: "Sawan Bhadav",
  //   leadership: {
  //     title: "बस्ती नेतृत्व: सावन भादो",
  //     campaignHead: [
  //       {
  //         position: "अभियान प्रमुख",
  //         name: "सुरेंदर रविदास", 
  //         image: "/assets/img/dhwaj.jpeg",
  //       },
  //       {
  //         position: "सह अभियान प्रमुख",
  //         name: "जगदंबा",
  //         image: "/assets/img/dhwaj.jpeg",
  //       },
  //     ],
  //     implementationTeam: [
  //       {
  //         position: "क्रियान्वयन टोली सदस्य",
  //         name: "धीरज",
  //         image: "/assets/img/dhwaj.jpeg",
  //       },
  //     ],
  //   },
  //   tolis: [
  //     {
  //       toliName: "टोली 1 (रविदास नगर)",
  //       members: [
  //         { position: "टोली प्रमुख", name: "देव चन्दर", image: "/assets/img/dhwaj.jpeg" },
  //         { position: "सह टोली प्रमुख", name: "संजय", image: "/assets/img/dhwaj.jpeg" },
  //         { position: "टोली सदस्य", name: "पंडित जनार्दन", image: "/assets/img/dhwaj.jpeg" },
  //       ],
  //     },
  //   ],
  // },

  // // --- बाबा फरीद पुरी बस्ती ---
  // {
  //   bastiName: "बाबा फरीद पुरी",
  //   bastiEnglishName: "Baba Farid Puri",
  //   leadership: {
  //     title: "बस्ती नेतृत्व: बाबा फरीद पुरी",
  //     campaignHead: [
  //       {
  //         position: "अभियान प्रमुख",
  //         name: "हरफूल", 
  //         image: "/assets/img/dhwaj.jpeg",
  //       },
  //     ],
  //     implementationTeam: [
  //       {
  //         position: "क्रियान्वयन टोली सदस्य",
  //         name: "सुशील पंडित",
  //         image: "/assets/img/dhwaj.jpeg",
  //       },
  //     ],
  //   },
  //   tolis: [
  //     {
  //       toliName: "टोली 1 (मुख्य मार्ग)",
  //       members: [
  //         { position: "टोली प्रमुख", name: "निखिल", image: "/assets/img/dhwaj.jpeg" },
  //         { position: "सह टोली प्रमुख", name: "अभिषेक", image: "/assets/img/dhwaj.jpeg" },
  //         { position: "टोली सदस्य", name: "मनोज", image: "/assets/img/dhwaj.jpeg" },
  //       ],
  //     },
  //   ],
  // },
];

// --- सहायक कंपोनेंट: सदस्य कार्ड (Member Card Component) ---
const MemberCard = ({ member, className = "", positionColor = "", lineColor = "" }) => {
  const cardContainerClass = "max-w-xs mx-auto";

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className} ${cardContainerClass}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col items-center text-center p-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 rounded-full blur-lg opacity-30"></div>
            <img
              src={member.image}
              alt={member.name} 
              className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <p className={`text-sm font-semibold uppercase tracking-wide ${positionColor}`}>
            {member.position}
          </p>

          <h3 className="text-xl font-bold text-foreground">
            {member.name} जी
          </h3>
        </div>

        <div className={`h-2 bg-gradient-to-r ${lineColor}`}></div>
      </CardContent>
    </Card>
  );
};

// --- मुख्य कंपोनेंट (Main Component) ---
const VgsAbhiyan = () => {
  // डिफ़ॉल्ट रूप से पहली बस्ती का इंडेक्स (0) सेट करें
  const [activeBastiIndex, setActiveBastiIndex] = useState(0);
  const activeBasti = vgsAbhiyanData[activeBastiIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            व्यापक गृह संपर्क अभियान
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            **चाणक्य शाखा** के अंतर्गत बस्ती-वार अभियान नेतृत्व
          </p>
          <div className="mt-4 text-sm text-gray-500">
            **अभियान:** पंच परिवर्तन
          </div>
        </div>

        {/* --- Basti Tabs Navigation --- */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-center border-b border-gray-200">
            {vgsAbhiyanData.map((basti, index) => (
              <button
                key={index}
                onClick={() => setActiveBastiIndex(index)}
                className={`
                  py-3 px-6 text-sm font-medium transition-colors duration-300 ease-in-out
                  ${activeBastiIndex === index
                    ? 'border-b-4 border-red-600 text-red-600 bg-red-50/50'
                    : 'text-gray-500 hover:text-red-500 hover:bg-gray-50'
                  }
                `}
              >
                <Building className="w-4 h-4 inline mr-2" />
                {basti.bastiName}
              </button>
            ))}
          </div>
        </div>
        {/* --- End Tabs Navigation --- */}


        {/* --- Basti Content (Active Tab) --- */}
        <div className="space-y-20 max-w-7xl mx-auto">
          <div className="border-4 border-double border-red-600/50 rounded-lg p-6 bg-white shadow-xl">
              
              {/* Basti Header */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-red-700 pb-4 flex items-center justify-center">
                {activeBasti.bastiName}
              </h2>
              
              <hr className="border-red-600/20" />

              {/* Basti Leadership (अभियान प्रमुख एवं सह प्रमुख) */}
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold text-center text-orange-600 flex items-center justify-center">
                  <Award className="w-6 h-6 mr-2" />
                  बस्ती नेतृत्व
                </h3>
                
                {/* Campaign Head */}
                <div className={`grid gap-8 justify-center ${
                  activeBasti.leadership.campaignHead.length === 1 
                  ? "grid-cols-1 max-w-xs mx-auto" 
                  : "grid-cols-1 md:grid-cols-2 max-w-xl mx-auto"
                }`}>
                  {activeBasti.leadership.campaignHead.map((member, idx) => (
                    <MemberCard 
                      key={`head-${activeBastiIndex}-${idx}`} 
                      member={member} 
                      className="border-red-600/50" 
                      positionColor="text-red-600"
                      lineColor="from-red-600 via-orange-500 to-red-600"
                    />
                  ))}
                </div>

                {/* Implementation Team */}
                <div className={`grid gap-8 justify-center mt-6 ${
                  activeBasti.leadership.implementationTeam.length === 1 
                  ? "grid-cols-1 max-w-xs mx-auto" 
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto"
                }`}>
                  {activeBasti.leadership.implementationTeam.map((member, idx) => (
                    <MemberCard 
                      key={`kriya-${activeBastiIndex}-${idx}`} 
                      member={member} 
                      className="border-orange-500/50" 
                      positionColor="text-orange-500"
                      lineColor="from-orange-500 via-red-600 to-orange-500"
                    />
                  ))}
                </div>
              </div>

              <hr className="border-red-600/20" />

              {/* Toli Structure */}
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold text-center text-red-600">
                  टोली संरचना
                </h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {activeBasti.tolis.map((toli, toliIdx) => (
                    <Card key={`toli-${activeBastiIndex}-${toliIdx}`} className="border-2 border-red-600/50 shadow-md bg-red-50/70">
                      <CardHeader className="bg-red-600/10 border-b border-red-600/30 p-4">
                        <CardTitle className="flex items-center text-xl font-bold text-red-700">
                          <Users className="w-5 h-5 mr-2" />
                          {toli.toliName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        {toli.members.map((member, idx) => (
                          <div key={idx} className="flex items-start space-x-3 border-b pb-2 last:border-b-0 last:pb-0">
                            <ChevronDown className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-sm font-semibold text-orange-600 leading-tight">
                                {member.position}
                              </p>
                              <h4 className="text-base font-bold text-gray-800">
                                {member.name} जी
                              </h4>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
          </div>
        </div>
        {/* --- End Basti Content --- */}


        {/* Footer Quote */}
        <div className="mt-20 text-center">
          <Card className="inline-block p-8 bg-gradient-to-br from-red-600/5 to-orange-500/10 border-red-600/20">
            <p className="text-lg text-muted-foreground mb-2">
              हम सब मिलकर करेंगे यह व्यापक गृह संपर्क अभियान सफल
            </p>
            <p className="text-2xl font-bold text-red-600">
              राष्ट्रीय स्वयंसेवक संघ
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};


export default VgsAbhiyan;
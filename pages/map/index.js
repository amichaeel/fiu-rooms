import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ImageMapper from 'react-img-mapper';

const CampusMap = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(1500);

  const handleBuildingClick = (area) => {
    router.push(`/${area.title}`);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setParentWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const MAP = {
    name: "campus-map",
    areas: [
      { name: "PG6", title: "Parking Garage 6", shape: "poly", coords: [1391, 182, 1388, 303, 1532, 308, 1535, 187], preFillColor: "#00000050" },
      { name: "PG5", title: "PG5 Market Station", shape: "poly", coords: [1784, 195, 1780, 322, 1931, 322, 1931, 198], preFillColor: "#00000050" },
      { name: "AH5", title: "Academic Health Center 5", shape: "poly", coords: [1854, 374, 1968, 376, 1964, 461, 1935, 449, 1906, 430, 1890, 417, 1871, 403], preFillColor: "#00000050" },
      { name: "AH4", title: "Academic Health Center 4", shape: "poly", coords: [1703, 368, 1703, 407, 1840, 407, 1840, 372], preFillColor: "#00000050" },
      { name: "CP", title: "Chem & Physics", shape: "poly", coords: [1724, 447, 1724, 547, 1821, 551, 1821, 489, 1765, 483, 1765, 449], preFillColor: "#00000050" },
      { name: "OE", title: "Owa Ehan", shape: "poly", coords: [1638, 642, 1701, 644, 1705, 468, 1641, 468], preFillColor: "#00000050" },
      { name: "AH2", title: "Academic Health Center 2", shape: "poly", coords: [1848, 545, 1875, 518, 1941, 586, 1914, 607], preFillColor: "#00000050" },
      { name: "GC", title: "Graham Center", shape: "poly", coords: [1777, 952, 1632, 952, 1630, 887, 1667, 887, 1667, 862, 1638, 860, 1643, 829, 1593, 827, 1576, 802, 1647, 738, 1807, 740, 1807, 794, 1769, 796, 1767, 871, 1692, 869, 1699, 887, 1734, 889, 1736, 912, 1775, 914], preFillColor: "#00000050" },
      { name: "VH", title: "Viertes Haus", shape: "poly", coords: [1360, 646, 1362, 516, 1479, 516, 1479, 553, 1460, 555, 1466, 648], preFillColor: "#00000050" },
      { name: "GL", title: "Green Library", shape: "poly", coords: [1481, 630, 1479, 709, 1499, 711, 1497, 746, 1512, 752, 1512, 790, 1572, 790, 1574, 759, 1589, 759, 1589, 713, 1620, 713, 1620, 632], preFillColor: "#00000050" },
      { name: "PC", title: "Paul Cejas Architecture", shape: "poly", coords: [1493, 904, 1497, 978, 1576, 978, 1576, 993, 1589, 995, 1595, 962, 1609, 962, 1607, 906], preFillColor: "#00000050" },
      { name: "DM", title: "Deuxieme Maison", shape: "poly", coords: [1400, 790, 1402, 829, 1373, 827, 1377, 856, 1400, 856, 1400, 902, 1464, 906, 1464, 864, 1477, 852, 1481, 839, 1464, 831, 1466, 792], preFillColor: "#00000050" },
      { name: "CBC", title: "College of Business Complex", shape: "poly", coords: [1064, 539, 1062, 613, 1188, 617, 1192, 501, 1084, 499], preFillColor: "#00000050" },
      { name: "CASE", title: "Comp, Arts, Sci & Educat", shape: "poly", coords: [1499, 375, 1495, 481, 1537, 481, 1537, 437, 1560, 435, 1558, 474, 1601, 481, 1601, 375], preFillColor: "#00000050" },
      { name: "EH", title: "Everglades Residence Hall", shape: "poly", coords: [1327, 1123, 1325, 1192, 1246, 1192, 1248, 1221, 1331, 1219, 1385, 1271, 1402, 1256, 1348, 1196, 1346, 1125], preFillColor: "#00000050" },
      { name: "FROST", title: "Patricia&PhilipFrostMuseum", shape: "poly", coords: [1655, 1144, 1661, 1212, 1643, 1252, 1620, 1256, 1607, 1264, 1568, 1260, 1626, 1214, 1636, 1160], preFillColor: "#00000050" },
      { name: "PCA", title: "Paul Cejas Architecture", shape: "poly", coords: [1294, 384, 1296, 473, 1408, 477, 1379, 386], preFillColor: "#00000050" },
      { name: "OCEAN", title: "Ocean Bank Convoc Center", shape: "poly", coords: [827, 675, 825, 744, 792, 769, 740, 771, 725, 752, 696, 771, 682, 756, 713, 733, 661, 729, 659, 704, 647, 702, 647, 677, 678, 673, 680, 694, 715, 692, 690, 667, 703, 656, 725, 675, 742, 659, 796, 659], preFillColor: "#00000050" },
      { name: "MARC", title: "Mgmt & Advanced Resrch Ctr", shape: "poly", coords: [1564, 1065, 1564, 1096, 1622, 1094, 1624, 1129, 1653, 1129, 1655, 1069], preFillColor: "#00000050" },
      { name: "MANGO", title: "Mgmt and New Growth Opp", shape: "poly", coords: [1086, 633, 1084, 675, 1176, 677, 1169, 633], preFillColor: "#00000050" },
      { name: "RYDER", title: "Ryder Business", shape: "poly", coords: [1192, 629, 1294, 633, 1292, 662, 1267, 677, 1190, 671], preFillColor: "#00000050" },
      { name: "LABOR CENTER", title: "Labor Center", shape: "poly", coords: [1078, 762, 1080, 799, 1122, 803, 1120, 760], preFillColor: "#00000050" },
      { name: "SIPA", title: "Sch. Inter.&Public Affairs", shape: "poly", coords: [1138, 743, 1294, 747, 1290, 801, 1259, 793, 1246, 801, 1248, 822, 1140, 822], preFillColor: "#00000050" },
      { name: "ASTRO", title: "Stocker Astroscience Center", shape: "poly", coords: [1713, 565, 1740, 565, 1738, 612, 1713, 610], preFillColor: "#00000050" },
      { name: "ART STUDIO", title: "Studio", shape: "poly", coords: [508, 1303, 547, 1303, 549, 1287, 508, 1285], preFillColor: "#00000050" },
      { name: "WEST 1", title: "West 1", shape: "poly", coords: [352, 1308, 354, 1343, 420, 1349, 431, 1326, 431, 1310], preFillColor: "#00000050" },
      { name: "WEST 9", title: "West 9", shape: "poly", coords: [337, 702, 339, 737, 369, 737, 366, 706], preFillColor: "#00000050" },
      { name: "WEST 10", title: "West 10", shape: "poly", coords: [176, 654, 176, 745, 196, 749, 194, 660], preFillColor: "#00000050" },
      { name: "WERTHEIM", title: "Wertheim Prf Arts Ctr", shape: "poly", coords: [1620, 1386, 1645, 1382, 1626, 1362, 1636, 1345, 1667, 1370, 1690, 1359, 1686, 1312, 1709, 1312, 1711, 1349, 1744, 1351, 1748, 1370, 1771, 1370, 1775, 1420, 1707, 1420, 1667, 1465, 1651, 1465, 1638, 1449, 1622, 1447], preFillColor: "#00000050" },
      { name: "RAFEL", title: "Rafael Diaz-Balart", shape: "poly", coords: [956, 662, 952, 810, 1064, 814, 1076, 669], preFillColor: "#00000050" },
      { name: "ZIFF", title: "Ziff Education Bldg", shape: "poly", coords: [1137, 380, 1137, 471, 1185, 476, 1189, 378], preFillColor: "#00000050" },
      { name: "AH3", title: "Academic Health Center 3", shape: "poly", coords: [1857, 409, 1832, 430, 1897, 503, 1888, 511, 1915, 540, 1938, 517, 1899, 473, 1915, 463], preFillColor: "#00000050" },
      { name: "SASC", title: "Student Acad Success Cntr", shape: "poly", coords: [1884, 853, 1857, 872, 1841, 851, 1807, 878, 1882, 984, 1903, 961, 1884, 934, 1934, 909], preFillColor: "#00000050" },
      { name: "SAAC", title: "Student Athletic Academic Ctr", shape: "poly", coords: [384, 795, 386, 874, 415, 874, 415, 801], preFillColor: "#00000050" }
    ]
  };

  return (
    <div className='flex flex-col items-center justify-center w-full cursor'>
      <div className='md:mt-20 mt-28 flex flex-col items-center'>
        <span className='font-monumentExtended text-xl'>Campus Map</span>
        <span className='text-center text-sm'>To use this map, simply click on the building you would like to see the availability of. Buildings with no shading are not supported.</span>
      </div>
      <div className='h-auto mt-10 w-full max-w-[1500px]' ref={containerRef}>
        <ImageMapper
          src="/images/mmc.png"
          map={MAP}
          responsive={true}
          parentWidth={parentWidth}
          onClick={(area) => handleBuildingClick(area)}
          stayHighlighted={true}
          stayMultiHighlighted={true}
        />
      </div>
    </div>
  );
};

export default CampusMap;
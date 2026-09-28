-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: medication_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `0603_xlsx__________2`
--

DROP TABLE IF EXISTS `0603_xlsx__________2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `0603_xlsx__________2` (
  `COL 1` varchar(11) DEFAULT NULL,
  `COL 2` varchar(11) DEFAULT NULL,
  `COL 3` varchar(24) DEFAULT NULL,
  `COL 4` varchar(45) DEFAULT NULL,
  `COL 5` varchar(27) DEFAULT NULL,
  `COL 6` varchar(11) DEFAULT NULL,
  `COL 7` varchar(179) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `0603_xlsx__________2`
--

LOCK TABLES `0603_xlsx__________2` WRITE;
/*!40000 ALTER TABLE `0603_xlsx__________2` DISABLE KEYS */;
INSERT INTO `0603_xlsx__________2` VALUES ('medicine_id','category_id','medicine_name','english_name','manufacturer','dosage_form','description'),('AC48128100','CS001','達爾能持續性膠囊120毫克','Diltelan Capsules','南光化學製藥股份有限公司','持續性藥效膠囊劑','本藥成分為 Diltiazem，屬於「鈣離子阻斷劑」類的心血管藥物。主要透過擴張血管、降低血管阻力來控制高血壓，並能改善心臟冠狀動脈血流以預防狹心症（心絞痛）。本藥採用「持續性膠囊」長效劑型，能在體內緩慢釋放藥效，維持整天血壓穩定。'),('AC60836100','CS002','克壓脂膜衣錠5毫克/20毫克','Dualpress F.C. Tablets 5mg/20mg','生達化學製藥股份有限公司二廠','膜衣錠','本藥為二合一的複方降血壓藥物。結合了兩種不同機轉的成分：一種是放鬆並擴張血管的「纈沙坦 (Valsartan)」，另一種是幫助身體排出多餘水分與鹽分的利尿劑「氫氯噻嗪 (Hydrochlorothiazide) 」。兩者合併使用能達到更強效的降血壓功能，通常用於單一藥物控制效果不佳的高血壓患者。'),('BC26599100','CS003','里先安膜衣錠60毫克','Lixiana F.C. Tablets 60mg','DAIICHI SANKYO EUROPE GMBH','膜衣錠','里先安（Lixiana）是一種新型口服抗凝血劑（NOAC）。它透過高度選擇性地抑制體內的「第Xa凝血因子」，來阻斷凝血連鎖反應，從而減少血栓（血塊）的形成並延緩血液凝固的時間。'),('VC00034100','CS004','傲朴舒膜衣錠10毫克','Opsumit film-coated tablets 10mg','PATHEON FRANCE','膜衣錠','傲朴舒（Opsumit）是一種雙內皮素受體拮抗劑（ERA）。它主要的作用是阻斷體內「內皮素-1」與其受體的結合。內皮素會引發血管強烈收縮，而此藥能藉由阻斷它，達到擴張肺部血管、降低肺動脈血壓的效果，進而減輕心臟的負擔，延緩病情惡化。'),('A055915100','CS005','靜壓膜衣錠50毫克','Xarator Film-Coated Tablets 50mg','健喬信元醫藥生技股份有限公司健喬廠','膜衣錠','靜壓（Losartan）是一種血管收縮素受體阻斷劑（ARB），也就是俗稱的血壓藥。它能阻止體內血管收縮素與受體結合，讓全身的血管放鬆、擴張，從而達到降低血壓的效果。此外，它也能保護心臟與腎臟，延緩因高血壓或糖尿病引起的腎臟病變。'),('AC39703100','CS006','“杏輝”壓血泰膜衣錠200毫克（拉貝他樂）','Axetol Film Coated Tablets 200mg \"Sinphar\"','杏輝藥品工業股份有限公司','膜衣錠','壓血泰（Labetalol）是一種同時具有 Alpha（$\\alpha$）與 Beta（$\\beta$）受體阻斷作用的降血壓藥。它能同時讓血管放鬆擴張（減少阻力），並稍微減緩心跳、降低心臟收縮力，雙管齊下達到穩定降低血壓的效果。因為它的安全性相對較高，也是臨床上少數常用於治療孕婦高血壓的藥物之一。'),('A041281100','CS007','恩納比爾錠20毫克（伊那拉普利）','Enalapril Tablets 20mg','健喬信元醫藥生技股份有限公司健喬廠','錠劑','恩納比爾（Enalapril）是一種血管收縮素轉化酶抑制劑（ACEI）。它透過抑制體內特定酵素，阻斷具強烈血管收縮作用的「血管收縮素 II」生成。這能促使全身血管放鬆、擴張，從而有效降低血壓並減輕心臟的負荷。除降壓外，臨床上也常用於保護並延緩心臟衰竭及慢性腎臟病變的惡化。'),('AC50138100','CS008','“永勝”費落持續釋放錠 5 毫克','Felo E.R. F.C. Tablets 5mg \"EVEREST\"','永勝藥品工業股份有限公司','持續性釋放錠','費落（Felodipine）是一種鈣離子通道阻斷劑（CCB），屬於血管選擇性很高的降血壓與抗心絞痛藥物。它能抑制鈣離子進入血管平滑肌細胞，使全身的周邊血管放鬆、擴張，從而有效降低血壓。同時，它能改善心臟冠狀動脈的血液供給與氧氣平衡，達到緩解心絞痛的效果。'),('AB55585100','CS009','“生達”壓立緩膜衣錠 80 毫克','Decpress Film Coated Tablets 80mg \"Standard\"','生達化學製藥股份有限公司二廠','膜衣錠','壓立緩（Valsartan）是一種血管收縮素受體阻斷劑（ARB），與先前提到過的「靜壓」屬於同類型的降血壓藥物。它能精準阻斷讓血管收縮的物質，使全身血管放鬆、擴張，進而降低血壓。此外，它也能減輕心臟的過度負荷，在臨床上對保護心血管、心臟與腎臟有良好的效果。'),('AC55583100','CS010','“十全”柔脂膜衣錠 20 毫克','Lipdown Film Coated Tablets 20mg \"C.P.\"','十全實業股份有限公司','膜衣錠','柔脂（Atorvastatin）是一種 HMG-CoA 還原酶抑制劑，也就是俗稱的 「他汀類（Statin）」降膽固醇/降血脂藥物。它能抑制肝臟中製造膽固醇的關鍵酵素，進而大幅降低血液中的低密度脂蛋白膽固醇（壞膽固醇，LDL-C）與三酸甘油酯，並稍微提高高密度脂蛋白膽固醇（好膽固醇）。這有助於預防血管粥狀硬化，降低心血管疾病與中風的風險。'),('AB55557100','CS011','“生達”壓立緩膜衣錠160毫克','Decpress Film Coated Tablets 160mg \"Standard\"','生達化學製藥股份有限公司二廠','膜衣錠','壓立緩（Valsartan）是一種血管收縮素受體阻斷劑（ARB）系列的高血壓藥物。160 毫克的高劑量通常用於需要更強力控制血壓的患者，或是已經穩定的心衰竭、心肌梗塞後續治療。它透過讓全身血管放鬆、擴張，達到穩定降血壓與減輕心臟負擔的效果。'),('AC55558100','CS012','“井田”諾莎特膜衣錠 50 毫克','Losater F.C. Tablets 50mg \"Chinteng\"','井田國際醫藥廠股份有限公司','膜衣錠','諾莎特（Losartan）是一種血管收縮素受體阻斷劑（ARB）的降血壓藥。它能阻止體內血管收縮素發揮作用，使全身的血管放鬆、擴張，從而達到穩定降低血壓的效果。同時，它對腎臟微血管具有保護作用，能有效延緩糖尿病病患的腎臟病變惡化。'),('AC55552100','CS013','“羅得”得優 5 毫克 錠','DU.Q Tablets 5mg ROOT','羅得化學製藥股份有限公司','錠劑','得優（Amlodipine）是一種長效型鈣離子通道阻斷劑（CCB），是臨床上極為常用且經典的第一線降血壓與抗心絞痛藥物。它主要透過放鬆與擴張周邊的小血管，讓血液流動更順暢，進而達到穩定降低血壓的效果。同時，它也能擴張心臟的冠狀動脈，增加心臟的供氧量，以此緩解心絞痛。'),('AC332241G0','CS014','\"中國化學\" 迪心贊（鹽酸迪太贊）錠 30 公絲','Dilzem Tablets 30mg \"C.C.P.C.\"','中國化學製藥股份有限公司新豐工廠','錠劑','迪心贊（Diltiazem）是一種非二氫吡啶類（Non-Dihydropyridine）的鈣離子通道阻斷劑。它與前面提到的得優、費落不同，它除了能放鬆、擴張血管來降低血壓之外，最主要的特色是它對心臟有直接的作用——能減緩心跳速度、抑制心律不整，並擴張冠狀動脈以緩解心絞痛。'),('AC55540100','CS015','樂壓定 膜衣錠 6 毫克','Lesyn® F.C. Tablets 6mg','健喬信元醫藥生技股份有限公司健喬廠','膜衣錠','樂壓定（Lacidipine）是一種二氫吡啶類（Dihydropyridine）的鈣離子通道阻斷劑（CCB）。它具備極高的專一性，主要作用在全身的血管平滑肌。透過阻止鈣離子進入血管細胞，讓末梢小動脈放鬆、擴張並降低血管阻力，從而達到降低血壓的效果。'),('AC47632100','CS016','\"華興\"壓可平錠10毫克 (安脈狄平)','AMLODIPINE (BESYLATE) 10 mg','華興化學製藥廠股份有限公司','錠劑','壓可平（Amlodipine）是一種長效型鈣離子通道阻斷劑（CCB）。它透過放鬆與擴張周邊小血管，降低血液流動的阻力，達到穩定降低血壓的效果。同時，它能擴張心臟的冠狀動脈，增加心臟血液與氧氣的供應，以緩解並預防心絞痛。10 毫克屬於此成分的最高單顆規格，通常用於需要更強力控制血壓或心絞痛的患者。'),('AB44098100','CS017','\"生達\"順壓樂持續釋放錠 5 毫克','Fedil S.R. Tablets 5mg \"Standard\"','生達化學製藥股份有限公司二廠','持續釋放錠','順壓樂（Felodipine）是一種長效型鈣離子通道阻斷劑（CCB）。它對血管平滑肌具有高度的專一性，能使全身的周邊小動脈放鬆、擴張，有效降低血液流動的阻力，進而達到穩定降低血壓的效果。同時，它也能擴張冠狀動脈、增加心肌的供氧量，有效緩解與預防心絞痛的發作。'),('AC55531100','CS018','坦壓膜衣錠 50 毫克','Tanza F.C. Tablets 50mg','正和製藥股份有限公司新營廠','膜衣錠','坦壓（Losartan）是一種血管收縮素受體阻斷劑（ARB）的降血壓藥。它能精準地阻止體內讓血管收縮的物質（血管收縮素 II）與受體結合，進而使全身的血管放鬆、擴張，達到穩定降低血壓的效果。同時，它也是醫學界公認能有效降低腎臟微血管壓力、延緩糖尿病患腎功能惡化的指標性藥物。'),('AC44063100','CS019','\"瑞安\" 得利心錠 2 毫克','Terasin Tablets 2mg \"Purzer\"','優良化學製藥股份有限公司','錠劑','得利心（Terazosin）是一種 Alpha-1（$\\alpha_1$）受體阻斷劑。它在臨床上是一個功能非常特別的「一藥雙效」藥物，主要作用於以下兩個部位：1.放鬆血管： 阻斷血管上的 Alpha-1 受體，使全身血管擴張、放鬆，從而降低血壓。2.放鬆平滑肌： 阻斷前列腺（攝護腺）與膀胱頸的平滑肌受體，減輕尿道壓迫，進而改善排尿障礙。'),('AC39414100','CS020','\"信東\" 樂壓錠 20 公絲（伊那拉普利）','sintec Tablets 20mg \"S.T.\"','信東生技股份有限公司','錠劑','樂壓（Enalapril）是一種血管收縮素轉化酶抑制劑（ACEI）。它透過抑制體內特定酵素的活性，阻止具強烈血管收縮作用的「血管收縮素 II」生成。這能促使全身的血管放鬆、擴張，達到穩定降低血壓的效果。同時，它能有效減輕心臟的過度負荷，並在臨床上具有保護心臟與延緩慢性腎臟病變惡化的良好效果。'),('AC39396100','CS021','\"台裕\"迪適倍錠 40 毫克(鹽酸普潘奈)','Disbeta Tablets 40mg \"Tai Yu\"','台裕化學製藥廠股份有限公司','錠劑','迪適倍（Propranolol）是一種非選擇性的 Beta（$\\beta$）受體阻斷劑。它能減緩心跳速度、降低心臟收縮力以減輕心臟負擔、降低血壓。此外，它能有效阻斷因緊張、焦慮引發的身體交感神經亢進反應，具備優秀的安定神經、抑制發抖與心悸效果，因此在精神科、神經內科及新陳代謝科的應用也極為普遍。'),('BC24306100','CS022','迎甦心 膜衣錠 50 毫克','Inspra F.C. Tablets 50 mg','VIATRIS PHARMACEUTICALS LLC','膜衣錠','迎甦心（Eplerenone）是一種選擇性醛固酮受體拮抗劑，臨床分類上屬於「保鉀利尿劑」。50 毫克的高劑量主要用於更強力地阻斷體內醛固酮對心臟與血管的危害，達到預防心肌纖維化、保護心血管系統、減輕心臟負擔的效果。多項大型臨床研究證實，此劑量能顯著降低心衰竭病患的死亡率與再住院率。'),('AC393881G0','CS023','\"利達\"維心平錠 10 毫克（普潘奈）','Inral Tablets 10mg Lita','利達製藥股份有限公司','錠劑','維心平（Propranolol）是一種非選擇性的 Beta（$\\beta$）受體阻斷劑。它能減緩心跳、降低心臟收縮力以降低血壓與減輕心臟負擔。由於 10 毫克能輕微且精準地阻斷因緊張、焦慮引發的身體交感神經亢進，它在臨床上非常著名的一項用途是當作「抗緊張/上台怯場藥」。它能有效消除心悸、手抖、冒冷汗等生理恐慌症狀，而不會像傳統安眠藥物那樣引起嚴重的昏睡感。'),('AB55406100','CS024','心舒康膜衣錠 5 毫克','Sinbisol Film Coated Tablets 5 mg','信東生技股份有限公司','膜衣錠','心舒康（Bisoprolol）是一種高度選擇性的 Beta-1（$\\beta_1$）受體阻斷劑。它與先前介紹過的「維心平」或「迪適倍」不同，它主要精準作用於心臟上的 $\\beta_1$ 受體。透過減緩心跳速度、降低心臟收縮力，它能有效減輕心臟的過度負荷、降低血壓並減少心肌耗氧量。因為它的心臟選擇性極高，對氣管的副作用相較於第一代非選擇性藥物低。'),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('','','','','','',''),('100','','','','','',''),('101','','','','','',''),('102','','','','','',''),('103','','','','','',''),('104','','','','','','');
/*!40000 ALTER TABLE `0603_xlsx__________2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `0603_xlsx____________`
--

DROP TABLE IF EXISTS `0603_xlsx____________`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `0603_xlsx____________` (
  `COL 1` varchar(14) DEFAULT NULL,
  `COL 2` varchar(7) DEFAULT NULL,
  `COL 3` varchar(11) DEFAULT NULL,
  `COL 4` varchar(46) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `0603_xlsx____________`
--

LOCK TABLES `0603_xlsx____________` WRITE;
/*!40000 ALTER TABLE `0603_xlsx____________` DISABLE KEYS */;
INSERT INTO `0603_xlsx____________` VALUES ('side_effect_id','info_id','effect_name','description'),('1','1','下肢水腫','腳部腫脹。'),('2','1','頭痛','可能出現輕微至中度頭痛，通常休息後可改善；若持續或劇烈應告知醫師。'),('3','1','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('4','1','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('5','1','心跳變慢','心跳速度比平常慢，可能感到疲倦、無力或頭暈。'),('6','2','頭痛','可能出現輕微至中度頭痛，通常休息後可改善；若持續或劇烈應告知醫師。'),('7','2','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('8','2','肌肉痠痛','可能出現肌肉疼痛、痠痛或無力，若症狀持續或嚴重應告知醫師。'),('9','2','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('10','2','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('11','2','嘔吐','可能出現胃內容物排出的情況，通常伴隨噁心感。'),('12','3','皮膚軟組織出血','皮膚容易出現瘀青、瘀血或皮下出血，即使輕微碰撞也可能留下明顯瘀斑。'),('13','3','流鼻血','因凝血功能受到影響，鼻腔黏膜容易出血，且可能比平時更不容易止血。'),('14','3','陰道出血','女性可能出現月經量增加、經期延長，或非經期的異常陰道出血。'),('15','3','貧血','若因持續或反覆出血，可能導致紅血球減少，出現疲倦、頭暈、臉色蒼白或容易喘等症狀。'),('16','3','皮疹','部分患者可能出現紅疹、搔癢或其他皮膚過敏反應，若症狀嚴重應立即就醫。'),('17','3','肝功能檢驗值異常','少數患者可能出現肝功能指數升高，通常需透過抽血檢查發現，因此服藥期間應依醫囑定期追蹤肝功能。'),('18','4','貧血','若因持續或反覆出血，可能導致紅血球減少，出現疲倦、頭暈、臉色蒼白或容易喘等症狀。'),('19','4','鼻咽炎','鼻腔和咽喉發炎，常見症狀有流鼻水、鼻塞、喉嚨痛及打噴嚏，類似感冒。'),('20','4','咽炎','喉嚨發炎，可能出現喉嚨疼痛、吞嚥不適、聲音沙啞等症狀。'),('21','4','支氣管炎','支氣管發炎，可能引起咳嗽、咳痰、胸悶或呼吸不順。'),('22','4','頭痛','可能出現輕微至中度頭痛，通常休息後可改善；若持續或劇烈應告知醫師。'),('23','4','尿路感染','泌尿道受到感染，可能出現頻尿、排尿疼痛、尿急或尿液混濁等症狀。'),('24','5','暈眩','因血壓下降，可能出現頭暈或站立時暈眩。'),('25','5','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('26','5','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('27','5','咳嗽','少數患者可能有持續乾咳的情形。'),('28','5','低血壓','血壓過低時，可能感到虛弱、頭昏或想昏倒。'),('29','5','高血鉀症','血鉀升高可能造成肌肉無力或心律不整。'),('30','6','姿勢性低血壓','從坐著或躺著突然站起時，容易頭暈或眼前發黑。'),('31','6','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('32','6','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('33','6','疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('34','6','皮疹','少數患者可能出現皮膚紅疹或搔癢等過敏反應。'),('35','6','手腳冰冷','因周邊血液循環改變，手腳可能感到冰冷。'),('36','7','乾咳','一直咳嗽，但沒有痰。'),('37','7','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('38','7','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('39','7','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('40','7','虛弱','身體沒有力氣，活動時容易疲勞。'),('41','7','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('42','7','皮疹','少數患者可能出現皮膚紅疹或搔癢等過敏反應。'),('43','8','頭痛','頭部感到疼痛或脹痛。'),('44','8','臉部潮紅','臉部發熱、發紅。'),('45','8','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('46','8','心悸','感覺心跳加快或跳動明顯。'),('47','8','腳踝或下肢水腫','腳踝、腳部腫脹。'),('48','8','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('49','9','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('50','9','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('51','9','低血壓','血壓過低時，可能感到虛弱、頭昏或想昏倒。'),('52','9','高血鉀症','血鉀升高可能造成肌肉無力或心律不整。'),('53','10','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('54','10','腹痛','可能感到腹部疼痛或不適，通常症狀較輕微。'),('55','10','胃腸不適','可能出現噁心、消化不良、腹瀉、便秘或胃部不舒服等症狀。'),('56','10','肌肉酸痛','可能出現肌肉疼痛、痠痛或無力，若症狀持續或嚴重應告知醫師。'),('57','11','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('58','11','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('59','11','低血壓','血壓過低時，可能感到虛弱、頭昏或想昏倒。'),('60','11','高血鉀症','血鉀升高可能造成肌肉無力或心律不整。'),('61','12','腹痛','可能感到腹部疼痛或不適，通常症狀較輕微。'),('62','12','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('63','12','胸痛','可能出現胸口疼痛或壓迫感，若疼痛持續或加劇，應立即就醫。'),('64','12','水腫/腫脹','可能因體液滯留，造成腳踝、手部或臉部腫脹。'),('65','12','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('66','12','消化不良','可能感到胃脹、胃部不舒服、脹氣或食物消化較慢。'),('67','12','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('68','13','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('69','13','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('70','13','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('71','13','臉部潮紅','臉部發熱、發紅。'),('72','13','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('73','14','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('74','14','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('75','14','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('76','14','皮疹','少數患者可能出現皮膚紅疹或搔癢等過敏反應。'),('77','14','心跳變慢','心跳速度比平常慢，可能感到疲倦、無力或頭暈。'),('78','15','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('79','15','潮紅','臉部或身體感到發熱、皮膚發紅。'),('80','15','水腫','可能出現腳踝、腳部或手部腫脹。'),('81','15','心悸','可能感覺心跳加快、跳動明顯或不規則。'),('82','15','皮疹','少數患者可能出現皮膚紅疹或搔癢等過敏反應。'),('83','15','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('84','16','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('85','16','水腫','可能出現腳踝、腳部或手部腫脹。'),('86','16','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('87','16','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('88','16','臉部潮紅','臉部發熱、發紅。'),('89','16','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('90','17','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('91','17','潮紅','臉部或身體感到發熱、皮膚發紅。'),('92','17','心悸','可能感覺心跳加快、跳動明顯或不規則。'),('93','17','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('94','17','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('95','18','上呼吸道感染','可能出現類似感冒的症狀，例如鼻塞、流鼻水、喉嚨不適或咳嗽。'),('96','18','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('97','18','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('98','18','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('99','18','咳嗽','少數患者可能出現咳嗽，但通常比 ACE 抑制劑類降壓藥較少見。'),('100','19','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('101','19','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('102','19','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('103','19','心悸','可能感覺心跳加快、跳動明顯或不規則。'),('104','19','呼吸急促','少數患者可能出現呼吸變快或呼吸不順的感覺，若嚴重或伴隨胸痛需注意。'),('105','20','乾咳','一直咳嗽，但沒有痰。'),('106','20','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('107','20','姿勢性低血壓','從坐著或躺著突然站起時，容易頭暈或眼前發黑。'),('108','20','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('109','20','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('110','20','水腫','可能出現腳踝、腳部或手部腫脹。'),('111','21','心跳變慢','心跳速度比平常慢，可能感到疲倦、無力或頭暈。'),('112','21','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('113','21','手腳冰冷','因周邊血液循環改變，手腳可能感到冰冷。'),('114','21','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('115','21','睡眠不佳','可能出現失眠、睡不好或容易做夢，影響睡眠品質。'),('116','22','皮疹','少數患者可能出現皮膚紅疹或搔癢等過敏反應。'),('117','22','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('118','22','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('119','22','咳嗽','少數患者可能出現咳嗽，但通常比 ACE 抑制劑類降壓藥較少見。'),('120','22','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('121','22','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('122','22','便秘','排便次數減少或排便困難。'),('123','22','肌肉痠痛','可能出現肌肉疼痛、痠痛或無力，若症狀持續或嚴重應告知醫師。'),('124','23','心跳變慢','心跳速度比平常慢，可能感到疲倦、無力或頭暈。'),('125','23','無力/疲倦','可能感到精神不佳、容易疲勞或全身無力。'),('126','23','手腳冰冷','因周邊血液循環改變，手腳可能感到冰冷。'),('127','23','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('128','23','睡眠不佳','可能出現失眠、睡不好或容易做夢，影響睡眠品質。'),('129','24','暈眩','因血壓下降，可能出現頭暈或站起來時暈眩。'),('130','24','頭痛','可能出現輕度至中度頭痛，通常可自行改善。'),('131','24','噁心','可能感到胃部不適、想吐，通常症狀較輕微。'),('132','24','心跳變慢','心跳速度比平常慢，可能感到疲倦、無力或頭暈。'),('133','24','腹瀉','可能出現排便次數增加、糞便較稀等腸胃不適症狀。'),('134','24','便秘','排便次數減少或排便困難。'),('135','','',''),('136','','',''),('137','','',''),('138','','',''),('139','','',''),('140','','',''),('141','','',''),('142','','',''),('143','','',''),('144','','','');
/*!40000 ALTER TABLE `0603_xlsx____________` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `0603_xlsx_______________`
--

DROP TABLE IF EXISTS `0603_xlsx_______________`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `0603_xlsx_______________` (
  `COL 1` varchar(7) DEFAULT NULL,
  `COL 2` varchar(11) DEFAULT NULL,
  `COL 3` varchar(22) DEFAULT NULL,
  `COL 4` varchar(49) DEFAULT NULL,
  `COL 5` varchar(5) DEFAULT NULL,
  `COL 6` varchar(72) DEFAULT NULL,
  `COL 7` varchar(32) DEFAULT NULL,
  `COL 8` varchar(160) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `0603_xlsx_______________`
--

LOCK TABLES `0603_xlsx_______________` WRITE;
/*!40000 ALTER TABLE `0603_xlsx_______________` DISABLE KEYS */;
INSERT INTO `0603_xlsx_______________` VALUES ('info_id','medicine_id','basic_info','appearance','image','indications','side_effects_info','precautions'),('1','AC48128100','達爾能持續性膠囊120毫克','硬膠囊劑','','治療高血壓、狹心症（心絞痛）。','下肢水腫、頭痛、暈眩、心跳變慢、噁心。','1.服用本藥期間請勿飲酒。若您經常喝葡萄柚汁或吃葡萄柚，請告訴醫師。\n2.若妳計畫懷孕或已懷孕，就診時請務必告知醫師，由醫師評估是否可使用。\n3.請記錄血壓與心跳並定期回診，由醫師評估藥物反應，並進行相關檢查，勿自行停藥或減低藥量。'),('2','AC60836100','克壓脂膜衣錠5毫克/20毫克','橢圓形膜衣錠（依劑量不同為淺橙色或深紅色），有刻字。','','高血壓（可用於單一藥物控制不佳之患者）','頭痛、暈眩、肌肉痠痛、腹瀉、噁心、嘔吐。','1.孕婦絕對禁用。2.含利尿劑建議白天吃。3.起立動作慢防頭暈。4.忌葡萄柚汁。6.痛風者注意尿酸。'),('3','BC26599100','里先安膜衣錠60毫克','黃色圓形，表面標記有【DSC L60】','','預防中風與全身性栓塞、治療與預防靜脈栓塞','皮膚軟組織出血與流鼻血、陰道出血、貧血、皮疹以及肝功能檢驗值異常','1.不可擅自停藥。2.手術或拔牙前告知。3.避免自行併用其他藥物。5.特殊族群告知'),('4','VC00034100','傲朴舒膜衣錠10毫克','雙凸圓形膜衣錠','','原發性肺動脈高血壓（PAH）','貧血、鼻咽炎、咽炎、支氣管炎、頭痛、尿路感染。','1.此藥品會造成對胎兒造成傷害，在開始治療前、治療期間及治療後一個月必須避孕。\n2.若您目前正懷孕或哺乳，請告知您的醫師。\n3.此藥品可能會造成血紅素減少，若您有貧血問題，請告知您的醫師。\n4.此藥品應避免與抗肺結核藥物（rifampin）、抗黴菌藥物（ketoconazole）、抗病毒藥物（ritonavir）併用。'),('5','A055915100','靜壓膜衣錠50毫克','白色或類白色圓形膜衣錠，錠劑表面通常會有刻痕或特定數字','','高血壓、降低中風風險、第二型糖尿病腎病變。','暈眩、頭痛、無力/疲倦、咳嗽、低血壓、高血鉀症。','1.孕婦禁用。2.不可擅自停藥。3.飲食限制（控制鉀攝取）、5.定期監測。'),('6','AC39703100','“杏輝”壓血泰膜衣錠200毫克（拉貝他樂）','橘黃色或黃色（依錠劑外衣顏色而定）的圓形膜衣錠','','高血壓。','姿勢性低血壓、暈眩，噁心，疲倦、皮膚疹、手腳冰冷','1.絕對不可突然停藥、2.氣喘/慢性肺病患者務必告知、3.手術前告知、5.定期監測'),('7','A041281100','恩納比爾錠20毫克（伊那拉普利）','淡紅色或橘色、帶有刻痕的圓形/不規則形錠劑','','高血壓、充血性心臟衰謁','乾咳、頭痛、暈眩、無力/疲倦、虛弱、腹瀉、皮疹','1.孕婦禁用。2.飲食限制（防範高血鉀）。3.不可擅自停藥。4.定期監測。6.藥物交互作用'),('8','AC50138100','“永勝”費落持續釋放錠 5 毫克','粉橘色或橘紅色的圓形膜衣錠','','高血壓、心絞痛。','頭痛、臉部潮紅、暈眩、心悸、腳踝或下肢水腫、無力/疲倦','1.絕對不可剝半、壓碎或嚼碎。2.服藥期間禁食「葡萄柚/葡萄柚汁」。3.避免飲酒。4.孕婦不宜服用。6.姿勢改變放慢。'),('9','AB55585100','“生達”壓立緩膜衣錠 80 毫克','圓形膜衣錠，錠劑表面印有生達藥廠或特定規格的字樣/刻痕','','高血壓、心衰竭、心肌梗塞後左心室功能異常','暈眩、頭痛、低血壓、高血鉀症','1.孕婦禁用。2.不可擅自停藥或改藥。3.飲食限制（注意高鉀）。5.切勿搭配葡萄柚汁、茶或咖啡。'),('10','AC55583100','“十全”柔脂膜衣錠 20 毫克','白色或類白色、圓形或橢圓形的膜衣錠，錠劑表面通常印有藥廠代碼或特定數字','','高膽固醇血症、高脂血症、降低心血管疾病風險','頭痛、腹痛、胃腸不適、肌肉酸痛','1.孕婦及哺乳婦女禁用。2.服藥期間禁食「葡萄柚/葡萄柚汁」。3.避免過量飲酒4.定期監測肝功能與肌酸激酶（CK）。6.搭配飲食控制。'),('11','AB55557100','“生達”壓立緩膜衣錠160毫克 ','膠囊形（長橢圓形）膜衣錠，錠劑中間帶有刻痕','','高血壓、心衰竭、心肌梗塞後左心室功能異常','暈眩、頭痛、低血壓、高血鉀症','1.孕婦禁用。2.不可擅自停藥或調整劑量。3.飲食嚴格限制「低鈉鹽/代鹽」。5.定期監測。'),('12','AC55558100','“井田”諾莎特膜衣錠 50 毫克','白色、橢圓形或圓形的膜衣錠，錠劑表面印有藥廠特定代碼或規格數字','','高血壓、治療第二型糖尿病腎病變','腹痛、無力/疲倦、胸痛、水腫/腫脹、腹瀉、消化不良、噁心。','1.孕婦禁用。2.飲食限制（嚴禁含鉀鹽類）。3.不可擅自停藥。5.定期監測。'),('13','AC55552100','“羅得”得優 5 毫克 錠','白色、八角形、圓形或長條形的小顆錠劑，中間大多帶有刻痕','','高血壓、心絞痛。','頭痛、疲倦、噁心、臉部潮紅、暈眩','1.服藥期間應避免大量飲用「葡萄柚/葡萄柚汁」。2.不可驟然停藥。3.姿勢改變放慢。5.定期監測血壓。'),('14','AC332241G0','中國化學 迪心贊（鹽酸迪太贊）錠 30 公絲','白色圓形的小顆錠劑，中間通常帶有刻痕','','狹心症、輕度至中度之本態性高血壓。','頭痛、噁心、暈眩、皮疹、心跳變慢','1.嚴重特殊心臟疾病者禁用。2.服藥期間禁食「葡萄柚/葡萄柚汁」。3.不可擅自停藥。5.定期監測心跳與血壓。'),('15','AC55540100','樂壓定 膜衣錠 6 毫克','白色至淺黃色的橢圓形膜衣錠。錠劑的一面標記有【L 6】或【L/6】字樣，另一面則標記有【SYN】。','','高血壓。','頭痛、潮紅、水腫、心悸、皮疹、暈眩','1.服藥期間禁食「葡萄柚/葡萄柚汁」。2.小心剝半使用與避光。4.特殊心血管/肝臟疾病告知。'),('16','AC47632100','華興壓可平錠 10 毫克 (安脈狄平)','白色圓形或八角形的小顆錠劑，中間通常帶有刻痕','','高血壓、心絞痛。','頭痛、水腫、無力/疲倦、噁心、臉部潮紅、暈眩','1.服藥期間嚴禁大量飲用「葡萄柚/葡萄柚汁」。2.不可驟然停藥。3.起身動作放慢。5.定期監測血壓與回診。'),('17','AB44098100','\"生達\"順壓樂持續釋放錠 5 毫克','淡紅橙色（粉橘色）的圓扁形錠劑。錠劑正面通常印有【F06】字樣，背面則印有【STD】。','','高血壓、心絞痛。','頭痛、潮紅、心悸、無力/疲倦、暈眩','1.絕對不可剝半、壓碎或嚼碎。2.服藥期間禁食「葡萄柚/葡萄柚汁」。3.不可自行停藥。4.孕婦不宜服用。6.姿勢改變放慢。'),('18','AC55531100','坦壓膜衣錠 50 毫克','白色、橢圓形的膜衣錠，錠劑中間帶有刻痕','','高血壓、治療第II型糖尿病腎病變。','上呼吸道感染、無力/疲倦、頭痛、暈眩、咳嗽。','1.孕婦禁用。2.飲食限制（嚴禁含鉀鹽類）。3.不可擅自停藥。5.定期監測。'),('19','AC44063100','\"瑞安\" 得利心錠 2 毫克','橘黃色或黃色的圓形或長條形小顆錠劑，中間通常帶有刻痕','','高血壓、良性攝護腺肥大症。','頭痛、暈眩、無力/疲倦、心悸、呼吸急促','1.首次服藥或調整劑量後注意。2.不可擅自驟然停藥。4.白內障手術前告知。'),('20','AC39414100','\"信東\" 樂壓錠 20 公絲（伊那拉普利）','淡紅色、橘色或類白色的三角形或圓形錠劑，中間帶有刻痕','','高血壓、充血性心臟衰竭','乾咳、暈眩、姿勢性低血壓、頭痛、噁心、水腫','1.孕婦禁用。2.飲食嚴格限制「低鈉鹽/代鹽」。3.不可擅自停藥。5.定期監測'),('21','AC39396100','\"台裕\"迪適倍錠 40 毫克(鹽酸普潘奈)','圓形、錠劑表面印有藥廠特定代號或帶有刻痕的小顆藥丸','','狹心症、不整律（上心室性不整律、心室性心搏過速）原發性及腎性高血壓、扁頭痛、控制原發性震顛、控制焦慮性心搏過速、甲狀腺毒症的輔助劑、親鉻細胞瘤','心跳變慢、無力/疲倦、手腳冰冷、腹瀉、睡眠不佳','1.絕對不可突然停藥。2.【絕對禁忌】氣喘與慢性肺病患者。3.糖尿病患者注意。4.體育賽事禁用。6.定期監測心跳。'),('22','BC24306100','迎甦心 膜衣錠 50 毫克','黃色、圓形的膜衣錠。錠劑一面印有【Pfizer】字樣，另一面印有【VNS】及【50】','','心肌梗塞後之心衰竭、NYHA第II級(慢性)心衰竭、高血壓。','皮疹、頭痛、暈眩、咳嗽、腹瀉、噁心、便秘、肌肉痠痛','1.飲食嚴格禁用「低鈉鹽/代鹽」。2.服藥期間禁食「葡萄柚/葡萄柚汁」。3.絕對禁忌症（重度肝腎損傷、高血鉀者禁用）。5.定期回診抽血'),('23','AC393881G0','\"利達\"維心平錠 10 毫克（普潘奈）','粉紅色或淡橘色、圓形的小顆錠劑，錠劑表面帶有十字或單條刻痕','','狹心症、不整律（上心室性不整律、心室性心摶過速）、原發性及腎性高血壓、偏頭痛、控制原發性震顛、控制焦慮性心摶過速、甲狀腺毒症的輔助劑、親鉻細胞瘤','心跳變慢、無力/疲倦、手腳冰冷、腹瀉、睡眠不佳','1.氣喘與慢性肺病患者禁用。2.不可驟然停藥。3.糖尿病患者注意。5.體育賽事禁用。'),('24','AB55406100','心舒康膜衣錠 5 毫克','白色、弧面且常帶有特殊形狀（如心型或圓形）且中間有刻痕的小顆膜衣錠','','高血壓、狹心症、穩定型慢性中度至重度(NYHA class III、IV)心衰竭。','暈眩、頭痛、噁心、心跳變慢、腹瀉、便秘','1.絕對不可突然停藥。2.氣喘與慢性肺病史告知。3.糖尿病患者注意。4.定期監測血壓與心跳。6.體育賽事禁用。'),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('','','','','','','',''),('100','','','','','','',''),('101','','','','','','',''),('102','','','','','','',''),('103','','','','','','',''),('104','','','','','','',''),('105','','','','','','',''),('106','','','','','','','');
/*!40000 ALTER TABLE `0603_xlsx_______________` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` varchar(10) NOT NULL COMMENT '分類代碼',
  `category_name` varchar(50) NOT NULL COMMENT '分類名稱'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication_records`
--

DROP TABLE IF EXISTS `medication_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medication_records` (
  `record_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `medicine_id` varchar(36) NOT NULL,
  `scheduled_time` datetime NOT NULL,
  `actual_time` datetime NOT NULL,
  `status` enum('pending','taken','missed') NOT NULL,
  `remark` text NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `fk_records_users` (`user_id`),
  KEY `fk_records_medicines` (`medicine_id`),
  CONSTRAINT `fk_records_medicines` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_records_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication_records`
--

LOCK TABLES `medication_records` WRITE;
/*!40000 ALTER TABLE `medication_records` DISABLE KEYS */;
INSERT INTO `medication_records` VALUES ('rec-001','user-001','M001','2026-06-22 15:46:34','2026-06-22 15:46:34','pending','');
/*!40000 ALTER TABLE `medication_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine_info`
--

DROP TABLE IF EXISTS `medicine_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine_info` (
  `info_id` varchar(36) NOT NULL,
  `medicine_id` varchar(36) NOT NULL,
  `basic_info` text NOT NULL,
  `apperance` text NOT NULL,
  `indications` text NOT NULL,
  `side_effects_info` text NOT NULL,
  `precautions` text NOT NULL,
  PRIMARY KEY (`info_id`),
  KEY `fk_info_medicines` (`medicine_id`),
  CONSTRAINT `fk_info_medicines` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine_info`
--

LOCK TABLES `medicine_info` WRITE;
/*!40000 ALTER TABLE `medicine_info` DISABLE KEYS */;
INSERT INTO `medicine_info` VALUES ('IF001','M001','','','退燒、止痛、預防血栓','','');
/*!40000 ALTER TABLE `medicine_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine_inventory`
--

DROP TABLE IF EXISTS `medicine_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine_inventory` (
  `inventory_id` varchar(36) NOT NULL,
  `medicine_id` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `fk_inventory_medicines` (`medicine_id`),
  CONSTRAINT `fk_inventory_medicines` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine_inventory`
--

LOCK TABLES `medicine_inventory` WRITE;
/*!40000 ALTER TABLE `medicine_inventory` DISABLE KEYS */;
INSERT INTO `medicine_inventory` VALUES ('INV-001','M001',5,'2026-06-22');
/*!40000 ALTER TABLE `medicine_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicines` (
  `medicine_id` varchar(36) NOT NULL,
  `medicine_name` varchar(100) NOT NULL,
  `english_name` varchar(100) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `dosage_form` varchar(30) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`medicine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES ('M001','阿斯匹靈','Aspirin','台灣輝瑞','錠劑','');
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_details`
--

DROP TABLE IF EXISTS `prescription_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prescription_details` (
  `detail_id` varchar(36) NOT NULL,
  `prescription_id` varchar(36) NOT NULL,
  `dosage` varchar(50) NOT NULL,
  `frequency` varchar(50) NOT NULL,
  `duration_days` int(11) NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `fk_details_prescriptions` (`prescription_id`),
  CONSTRAINT `fk_details_prescriptions` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`prescription_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_details`
--

LOCK TABLES `prescription_details` WRITE;
/*!40000 ALTER TABLE `prescription_details` DISABLE KEYS */;
INSERT INTO `prescription_details` VALUES ('dt-001','rx-001','1 顆','一天 3 次，飯後',7);
/*!40000 ALTER TABLE `prescription_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prescriptions` (
  `prescription_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `hospital_name` varchar(100) NOT NULL,
  `doctor_name` varchar(30) NOT NULL,
  `start_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `remark` text NOT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `fk_prescriptions_users` (`user_id`),
  CONSTRAINT `fk_prescriptions_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES ('rx-001','user-001','台大醫院','張醫生','2026-06-01','2026-09-01','三餐飯後吃，記得多喝水');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder_settings`
--

DROP TABLE IF EXISTS `reminder_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reminder_settings` (
  `reminder_id` varchar(36) NOT NULL,
  `record_id` varchar(36) NOT NULL,
  `detail_id` varchar(36) NOT NULL,
  `reminder_method` enum('push_notification','phone_call','alarm') NOT NULL,
  `is_enabled` tinyint(1) NOT NULL,
  `reminder_time` time NOT NULL,
  `reminder_frequency` enum('daily','weekly','custom') NOT NULL,
  PRIMARY KEY (`reminder_id`),
  KEY `fk_reminders_records` (`record_id`),
  KEY `fk_reminders_details` (`detail_id`),
  CONSTRAINT `fk_reminders_details` FOREIGN KEY (`detail_id`) REFERENCES `prescription_details` (`detail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reminders_records` FOREIGN KEY (`record_id`) REFERENCES `medication_records` (`record_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder_settings`
--

LOCK TABLES `reminder_settings` WRITE;
/*!40000 ALTER TABLE `reminder_settings` DISABLE KEYS */;
INSERT INTO `reminder_settings` VALUES ('REM-001','rec-001','dt-001','alarm',1,'03:25:59','');
/*!40000 ALTER TABLE `reminder_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `side_effects`
--

DROP TABLE IF EXISTS `side_effects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `side_effects` (
  `side_effect_id` varchar(36) NOT NULL,
  `info_id` varchar(36) NOT NULL,
  `effect_name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`side_effect_id`),
  KEY `fk_side_effects_medicine_info` (`info_id`),
  CONSTRAINT `fk_side_effects_medicine_info` FOREIGN KEY (`info_id`) REFERENCES `medicine_info` (`info_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `side_effects`
--

LOCK TABLES `side_effects` WRITE;
/*!40000 ALTER TABLE `side_effects` DISABLE KEYS */;
INSERT INTO `side_effects` VALUES ('SE-001','IF001','輕微胃部不適','');
/*!40000 ALTER TABLE `side_effects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` char(255) NOT NULL,
  `name` varchar(30) NOT NULL,
  `gender` enum('男','女','其他','') NOT NULL,
  `birth_date` date NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user-001','admin','123456','小明','男','2000-01-01','09123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-28 20:36:53

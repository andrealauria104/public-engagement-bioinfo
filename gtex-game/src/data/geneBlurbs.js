// Two plain-language sentences per marker gene, shown in the result toast:
// first what the protein does, then why it matters (disease, medicine, a
// notable fact). Keyed by HGNC symbol; must cover every gene in gtex_real.json.

export const GENE_BLURBS = {
  // Liver
  ALB: {
    en: "Albumin is the most abundant protein in blood plasma: it holds fluid inside the blood vessels and carries hormones, fatty acids and drugs. When the liver makes too little of it, fluid leaks into the tissues and causes swelling.",
    it: "L'albumina è la proteina più abbondante del plasma: trattiene i liquidi nei vasi sanguigni e trasporta ormoni, acidi grassi e farmaci. Quando il fegato ne produce troppo poca, i liquidi passano nei tessuti e compaiono gonfiori (edemi).",
    fr: "L'albumine est la protéine la plus abondante du plasma : elle retient les liquides dans les vaisseaux et transporte hormones, acides gras et médicaments. Quand le foie en produit trop peu, les liquides passent dans les tissus et provoquent des œdèmes.",
  },
  APOB: {
    en: "Apolipoprotein B is the structural backbone of VLDL and LDL, the particles that carry cholesterol and fats from the liver through the bloodstream. High levels of these particles are one of the main risk factors for atherosclerosis.",
    it: "L'apolipoproteina B è l'impalcatura delle VLDL e delle LDL, le particelle che trasportano colesterolo e grassi dal fegato attraverso il sangue. Livelli elevati di queste particelle sono uno dei principali fattori di rischio per l'aterosclerosi.",
    fr: "L'apolipoprotéine B est la charpente des VLDL et des LDL, les particules qui transportent le cholestérol et les graisses du foie à travers le sang. Un taux élevé de ces particules est l'un des principaux facteurs de risque d'athérosclérose.",
  },
  CYP3A4: {
    en: "CYP3A4 is an enzyme that chemically breaks down a large share of commonly used medicines so the body can eliminate them. Grapefruit juice inhibits it, which is why some drug leaflets warn against drinking it.",
    it: "CYP3A4 è un enzima che scompone chimicamente una quota importante dei farmaci di uso comune, così che il corpo possa eliminarli. Il succo di pompelmo lo inibisce, ed è per questo che alcuni bugiardini ne sconsigliano il consumo.",
    fr: "CYP3A4 est une enzyme qui dégrade chimiquement une grande partie des médicaments courants pour que le corps puisse les éliminer. Le jus de pamplemousse l'inhibe, d'où les mises en garde de certaines notices.",
  },
  TTR: {
    en: "Transthyretin helps carry thyroid hormone in the blood and in the fluid around the brain and, together with a partner protein, vitamin A. When it misfolds it can form deposits (amyloidosis) that damage the heart and nerves.",
    it: "La transtiretina contribuisce a trasportare l'ormone tiroideo nel sangue e nel liquido che circonda il cervello e, insieme a una proteina partner, la vitamina A. Quando si ripiega in modo errato può formare depositi (amiloidosi) che danneggiano cuore e nervi.",
    fr: "La transthyrétine contribue à transporter l'hormone thyroïdienne dans le sang et dans le liquide qui entoure le cerveau et, avec une protéine partenaire, la vitamine A. Quand elle se replie mal, elle peut former des dépôts (amylose) qui abîment le cœur et les nerfs.",
  },
  SERPINA1: {
    en: "Alpha-1 antitrypsin is made in the liver and travels to the lungs, where it neutralises enzymes released by immune cells. A severe inherited deficiency leaves the lungs unprotected and can lead to early emphysema.",
    it: "L'alfa-1 antitripsina è prodotta dal fegato e raggiunge i polmoni, dove neutralizza gli enzimi rilasciati dalle cellule immunitarie. Una grave carenza ereditaria lascia i polmoni senza protezione e può causare un enfisema precoce.",
    fr: "L'alpha-1 antitrypsine est produite par le foie et gagne les poumons, où elle neutralise les enzymes libérées par les cellules immunitaires. Un déficit héréditaire sévère laisse les poumons sans protection et peut entraîner un emphysème précoce.",
  },

  // Brain
  GFAP: {
    en: "GFAP builds the internal skeleton of astrocytes, star-shaped cells that support and nourish neurons. When astrocytes are damaged it leaks into the blood, and a blood test for it helps doctors decide whether a CT scan is needed after a mild head injury.",
    it: "GFAP costruisce lo scheletro interno degli astrociti, cellule a forma di stella che sostengono e nutrono i neuroni. Quando gli astrociti si danneggiano passa nel sangue, e un esame del sangue che la misura aiuta i medici a decidere se serve una TAC dopo un lieve trauma cranico.",
    fr: "GFAP forme le squelette interne des astrocytes, des cellules en forme d'étoile qui soutiennent et nourrissent les neurones. Quand les astrocytes sont lésés, elle passe dans le sang, et un test sanguin qui la mesure aide les médecins à décider si un scanner est nécessaire après un traumatisme crânien léger.",
  },
  SNAP25: {
    en: "SNAP25 is part of the molecular machinery that lets neurons release neurotransmitters at synapses. Botulinum toxin (Botox) works by cutting it, which blocks nerve signals to the muscles.",
    it: "SNAP25 fa parte del meccanismo molecolare che permette ai neuroni di rilasciare i neurotrasmettitori nelle sinapsi. La tossina botulinica (Botox) agisce tagliandola, bloccando così i segnali nervosi diretti ai muscoli.",
    fr: "SNAP25 fait partie de la machinerie moléculaire qui permet aux neurones de libérer leurs neurotransmetteurs au niveau des synapses. La toxine botulique (Botox) agit en la coupant, ce qui bloque les signaux nerveux vers les muscles.",
  },
  MBP: {
    en: "Myelin basic protein helps compact myelin, the insulating sheath wrapped around nerve fibres that makes signals travel much faster. When myelin is damaged, as in multiple sclerosis, nerve signals slow down or fail.",
    it: "La proteina basica della mielina aiuta a compattare la mielina, la guaina isolante che avvolge le fibre nervose e rende i segnali molto più veloci. Quando la mielina è danneggiata, come nella sclerosi multipla, i segnali nervosi rallentano o si interrompono.",
    fr: "La protéine basique de la myéline aide à compacter la myéline, la gaine isolante qui entoure les fibres nerveuses et accélère fortement les signaux. Quand la myéline est endommagée, comme dans la sclérose en plaques, les signaux ralentissent ou s'interrompent.",
  },
  SYT1: {
    en: "Synaptotagmin 1 is a calcium sensor that triggers the release of neurotransmitters when a nerve impulse arrives. It acts in less than a millisecond, a key reason communication between neurons is so fast.",
    it: "La sinaptotagmina 1 è un sensore del calcio che fa scattare il rilascio dei neurotrasmettitori quando arriva un impulso nervoso. Agisce in meno di un millisecondo, uno dei motivi principali per cui la comunicazione tra neuroni è così rapida.",
    fr: "La synaptotagmine 1 est un capteur de calcium qui déclenche la libération des neurotransmetteurs à l'arrivée d'un influx nerveux. Elle agit en moins d'une milliseconde, l'une des principales raisons de la rapidité de la communication entre neurones.",
  },
  RBFOX3: {
    en: "RBFOX3 controls how many neuronal RNA messages are cut and assembled (splicing). Also known as NeuN, it is found almost only in neurons, so scientists stain it to identify neurons under the microscope.",
    it: "RBFOX3 controlla il modo in cui molti messaggi a RNA dei neuroni vengono tagliati e ricomposti (splicing). Noto anche come NeuN, si trova quasi solo nei neuroni, e per questo i ricercatori lo colorano per riconoscerli al microscopio.",
    fr: "RBFOX3 contrôle la façon dont de nombreux ARN des neurones sont coupés et réassemblés (épissage). Aussi appelé NeuN, il se trouve presque uniquement dans les neurones : les chercheurs le colorent pour les repérer au microscope.",
  },

  // Heart
  MYH6: {
    en: "MYH6 is a motor protein that pulls on actin filaments to make heart muscle cells contract. In humans it dominates in the atria, while the ventricles mostly use its close relative MYH7.",
    it: "MYH6 è una proteina motore che tira i filamenti di actina e fa contrarre le cellule del muscolo cardiaco. Nell'uomo prevale negli atri, mentre i ventricoli usano soprattutto la sua 'gemella' MYH7.",
    fr: "MYH6 est une protéine motrice qui tire sur les filaments d'actine pour faire contracter les cellules du muscle cardiaque. Chez l'humain, elle domine dans les oreillettes, tandis que les ventricules utilisent surtout sa proche parente MYH7.",
  },
  TNNT2: {
    en: "Cardiac troponin T is part of the switch that turns heart muscle contraction on when calcium rises. When heart cells are damaged it leaks into the blood, and measuring it is a standard test for heart attack.",
    it: "La troponina T cardiaca fa parte dell'interruttore che avvia la contrazione del muscolo cardiaco quando sale il calcio. Quando le cellule del cuore si danneggiano passa nel sangue, e la sua misura è un esame standard per l'infarto.",
    fr: "La troponine T cardiaque fait partie de l'interrupteur qui déclenche la contraction du muscle cardiaque quand le calcium augmente. Quand les cellules du cœur sont lésées, elle passe dans le sang, et son dosage est un examen standard de l'infarctus.",
  },
  NPPA: {
    en: "NPPA encodes ANP, a hormone the heart releases when its walls are stretched by excess blood volume. ANP tells the kidneys to eliminate salt and water, which lowers blood pressure.",
    it: "NPPA codifica l'ANP, un ormone che il cuore rilascia quando le sue pareti sono distese da un eccesso di volume di sangue. L'ANP spinge i reni a eliminare sale e acqua, abbassando la pressione.",
    fr: "NPPA code l'ANP, une hormone libérée par le cœur quand ses parois sont étirées par un excès de volume sanguin. L'ANP pousse les reins à éliminer sel et eau, ce qui fait baisser la tension.",
  },
  ACTC1: {
    en: "Cardiac actin forms the thin filaments that myosin grabs and pulls on at every heartbeat. Some inherited changes in this gene cause cardiomyopathies, diseases of the heart muscle.",
    it: "L'actina cardiaca forma i filamenti sottili che la miosina afferra e tira a ogni battito. Alcune alterazioni ereditarie di questo gene causano cardiomiopatie, malattie del muscolo cardiaco.",
    fr: "L'actine cardiaque forme les filaments fins que la myosine saisit et tire à chaque battement. Certaines altérations héréditaires de ce gène provoquent des cardiomyopathies, des maladies du muscle cardiaque.",
  },
  TNNI3: {
    en: "Cardiac troponin I keeps heart muscle relaxed between beats by blocking contraction until calcium arrives. It exists only in heart muscle, so finding it in the blood is a very specific sign of heart damage.",
    it: "La troponina I cardiaca mantiene il cuore rilassato tra un battito e l'altro, bloccando la contrazione finché non arriva il calcio. Esiste solo nel muscolo cardiaco, quindi trovarla nel sangue è un segnale molto specifico di danno al cuore.",
    fr: "La troponine I cardiaque maintient le muscle du cœur relâché entre deux battements en bloquant la contraction jusqu'à l'arrivée du calcium. Elle n'existe que dans le muscle cardiaque : la retrouver dans le sang est un signe très spécifique de lésion du cœur.",
  },

  // Kidney
  UMOD: {
    en: "Uromodulin is made by the kidney and is the most abundant protein in normal urine, where it traps bacteria and helps prevent urinary tract infections. Some inherited variants cause a slowly progressing kidney disease.",
    it: "L'uromodulina è prodotta dal rene ed è la proteina più abbondante nelle urine normali, dove intrappola i batteri e aiuta a prevenire le infezioni urinarie. Alcune varianti ereditarie causano una malattia renale a lenta progressione.",
    fr: "L'uromoduline est produite par le rein et c'est la protéine la plus abondante de l'urine normale, où elle piège les bactéries et aide à prévenir les infections urinaires. Certaines variantes héréditaires provoquent une maladie rénale d'évolution lente.",
  },
  AQP2: {
    en: "Aquaporin 2 is a water channel that the kidney inserts into its collecting ducts, under the control of the hormone vasopressin, to save water. Alcohol reduces vasopressin, which is why drinking makes you urinate more.",
    it: "L'acquaporina 2 è un canale per l'acqua che il rene inserisce nei dotti collettori, sotto il controllo dell'ormone vasopressina, per risparmiare acqua. L'alcol riduce la vasopressina, ed è per questo che bere alcolici fa urinare di più.",
    fr: "L'aquaporine 2 est un canal à eau que le rein insère dans ses tubes collecteurs, sous le contrôle de l'hormone vasopressine, pour économiser l'eau. L'alcool diminue la vasopressine, d'où l'envie fréquente d'uriner.",
  },
  SLC12A1: {
    en: "SLC12A1 recovers salt from the urine in the kidney's loop of Henle, which also allows the body to concentrate urine. Common diuretics such as furosemide work by blocking it.",
    it: "SLC12A1 recupera il sale dalle urine nell'ansa di Henle del rene, e così permette anche di concentrare le urine. Diuretici comuni come la furosemide agiscono bloccandolo.",
    fr: "SLC12A1 récupère le sel de l'urine dans l'anse de Henle du rein, ce qui permet aussi de concentrer l'urine. Des diurétiques courants comme le furosémide agissent en le bloquant.",
  },
  NPHS2: {
    en: "Podocin is part of the kidney's finest filter, the slit between podocytes, which keeps proteins in the blood and out of the urine. Inherited defects can cause nephrotic syndrome in children, with heavy protein loss in the urine.",
    it: "La podocina fa parte del filtro più fine del rene, la fessura tra i podociti, che trattiene le proteine nel sangue e le tiene fuori dalle urine. Difetti ereditari possono causare nei bambini una sindrome nefrosica, con grandi perdite di proteine nelle urine.",
    fr: "La podocine fait partie du filtre le plus fin du rein, la fente entre les podocytes, qui garde les protéines dans le sang et hors de l'urine. Des défauts héréditaires peuvent provoquer chez l'enfant un syndrome néphrotique, avec d'importantes pertes de protéines urinaires.",
  },
  REN: {
    en: "Renin is an enzyme released by the kidney when blood pressure drops, starting a hormone chain reaction that raises it again. Many blood pressure medicines, such as ACE inhibitors, act on this chain.",
    it: "La renina è un enzima rilasciato dal rene quando la pressione scende, e avvia una reazione a catena di ormoni che la fa risalire. Molti farmaci per la pressione, come gli ACE-inibitori, agiscono su questa catena.",
    fr: "La rénine est une enzyme libérée par le rein quand la tension baisse ; elle déclenche une réaction hormonale en chaîne qui la fait remonter. De nombreux médicaments contre l'hypertension, comme les inhibiteurs de l'enzyme de conversion, agissent sur cette chaîne.",
  },

  // Lung
  SFTPC: {
    en: "Surfactant protein C is part of the film that lowers surface tension in the air sacs, so they do not collapse when we breathe out. It is made only by type II alveolar cells, and inherited defects can cause chronic lung scarring.",
    it: "La proteina C del surfattante fa parte della pellicola che riduce la tensione superficiale negli alveoli, impedendo che collassino durante l'espirazione. È prodotta solo dalle cellule alveolari di tipo II, e difetti ereditari possono causare una fibrosi polmonare cronica.",
    fr: "La protéine C du surfactant fait partie du film qui réduit la tension superficielle dans les alvéoles, pour qu'elles ne s'affaissent pas à l'expiration. Elle n'est produite que par les cellules alvéolaires de type II, et des défauts héréditaires peuvent provoquer une fibrose pulmonaire chronique.",
  },
  SFTPB: {
    en: "Surfactant protein B helps reduce surface tension in the air sacs, preventing them from collapsing during breathing. It is so important that a severe congenital deficiency can cause respiratory failure in newborns.",
    it: "La proteina B del surfattante aiuta a ridurre la tensione superficiale negli alveoli, impedendo che collassino durante la respirazione. È così importante che una sua grave carenza congenita può causare insufficienza respiratoria nei neonati.",
    fr: "La protéine B du surfactant aide à réduire la tension superficielle dans les alvéoles, ce qui les empêche de s'affaisser pendant la respiration. Elle est si importante qu'un déficit congénital sévère peut provoquer une insuffisance respiratoire chez le nouveau-né.",
  },
  SCGB1A1: {
    en: "SCGB1A1 is secreted by club cells lining the small airways and helps dampen inflammation caused by smoke and pollutants. Its level in the blood is studied as an indicator of airway damage.",
    it: "SCGB1A1 è secreta dalle cellule 'club' che rivestono le piccole vie aeree e aiuta a smorzare l'infiammazione causata da fumo e inquinanti. Il suo livello nel sangue è studiato come indicatore di danno alle vie aeree.",
    fr: "SCGB1A1 est sécrétée par les cellules « club » qui tapissent les petites voies aériennes et aide à atténuer l'inflammation due à la fumée et aux polluants. Son taux sanguin est étudié comme indicateur de lésion des voies aériennes.",
  },
  NAPSA: {
    en: "Napsin A is an enzyme that helps process surfactant protein B in the air sac cells. Pathologists test tumour samples for it to tell whether a cancer started in the lung.",
    it: "La napsina A è un enzima che aiuta a maturare la proteina B del surfattante nelle cellule degli alveoli. I patologi la cercano nei campioni di tumore per capire se un cancro è nato nel polmone.",
    fr: "La napsine A est une enzyme qui aide à maturer la protéine B du surfactant dans les cellules des alvéoles. Les pathologistes la recherchent dans les tumeurs pour savoir si un cancer est né dans le poumon.",
  },
  AGER: {
    en: "AGER is a receptor that is especially abundant in the ultra-thin cells lining the air sacs, where oxygen passes into the blood. When these cells are injured it is released, and it is studied as a marker of acute lung damage.",
    it: "AGER è un recettore particolarmente abbondante nelle cellule sottilissime che rivestono gli alveoli, dove l'ossigeno passa nel sangue. Quando queste cellule si danneggiano viene rilasciato, ed è studiato come marcatore di danno polmonare acuto.",
    fr: "AGER est un récepteur particulièrement abondant dans les cellules ultrafines qui tapissent les alvéoles, là où l'oxygène passe dans le sang. Quand ces cellules sont lésées, il est libéré, et il est étudié comme marqueur d'atteinte pulmonaire aiguë.",
  },

  // Pancreas
  INS: {
    en: "Insulin is made by the beta cells of the pancreas and tells the body's cells to take up sugar from the blood after a meal. In type 1 diabetes the immune system destroys these cells, so insulin must be injected.",
    it: "L'insulina è prodotta dalle cellule beta del pancreas e dice alle cellule del corpo di assorbire lo zucchero dal sangue dopo un pasto. Nel diabete di tipo 1 il sistema immunitario distrugge queste cellule, e l'insulina va quindi iniettata.",
    fr: "L'insuline est produite par les cellules bêta du pancréas et indique aux cellules du corps d'absorber le sucre du sang après un repas. Dans le diabète de type 1, le système immunitaire détruit ces cellules : l'insuline doit alors être injectée.",
  },
  GCG: {
    en: "Glucagon works opposite to insulin: between meals it tells the liver to release sugar into the blood. An injection of glucagon is an emergency treatment for severe low blood sugar.",
    it: "Il glucagone agisce in modo opposto all'insulina: tra un pasto e l'altro dice al fegato di rilasciare zucchero nel sangue. Un'iniezione di glucagone è una terapia d'emergenza per le ipoglicemie gravi.",
    fr: "Le glucagon agit à l'inverse de l'insuline : entre les repas, il demande au foie de libérer du sucre dans le sang. Une injection de glucagon est un traitement d'urgence de l'hypoglycémie sévère.",
  },
  PRSS1: {
    en: "Trypsinogen is the inactive form of trypsin, a digestive enzyme that cuts proteins and is switched on only once it reaches the gut. Some inherited changes let it activate too early, causing hereditary pancreatitis.",
    it: "Il tripsinogeno è la forma inattiva della tripsina, un enzima digestivo che taglia le proteine e si attiva solo una volta arrivato nell'intestino. Alcune alterazioni ereditarie lo fanno attivare troppo presto, causando una pancreatite ereditaria.",
    fr: "Le trypsinogène est la forme inactive de la trypsine, une enzyme digestive qui coupe les protéines et ne s'active qu'une fois dans l'intestin. Certaines altérations héréditaires le font s'activer trop tôt, ce qui provoque une pancréatite héréditaire.",
  },
  AMY2A: {
    en: "Pancreatic amylase breaks down starch from foods such as bread, pasta and potatoes into sugars the gut can absorb. Measuring amylase in the blood is one of the tests used to detect inflammation of the pancreas.",
    it: "L'amilasi pancreatica scompone l'amido di alimenti come pane, pasta e patate in zuccheri che l'intestino può assorbire. La misura dell'amilasi nel sangue è uno degli esami usati per riconoscere un'infiammazione del pancreas.",
    fr: "L'amylase pancréatique découpe l'amidon d'aliments comme le pain, les pâtes et les pommes de terre en sucres que l'intestin peut absorber. Le dosage de l'amylase dans le sang est l'un des examens utilisés pour détecter une inflammation du pancréas.",
  },
  SST: {
    en: "Somatostatin is a 'brake' hormone: in the pancreas it restrains the release of both insulin and glucagon. Drugs that mimic it are used to treat some hormone-producing tumours.",
    it: "La somatostatina è un ormone 'freno': nel pancreas trattiene il rilascio sia dell'insulina sia del glucagone. Farmaci che la imitano sono usati per trattare alcuni tumori che producono ormoni.",
    fr: "La somatostatine est une hormone « frein » : dans le pancréas, elle freine la libération de l'insuline comme du glucagon. Des médicaments qui l'imitent servent à traiter certaines tumeurs productrices d'hormones.",
  },

  // Muscle
  ACTA1: {
    en: "Skeletal muscle actin forms the thin filaments that slide past myosin every time a muscle contracts. Inherited defects cause rare congenital myopathies, with weak muscles from birth.",
    it: "L'actina del muscolo scheletrico forma i filamenti sottili che scorrono sulla miosina ogni volta che un muscolo si contrae. Difetti ereditari causano rare miopatie congenite, con muscoli deboli fin dalla nascita.",
    fr: "L'actine du muscle squelettique forme les filaments fins qui glissent le long de la myosine à chaque contraction. Des défauts héréditaires provoquent de rares myopathies congénitales, avec des muscles faibles dès la naissance.",
  },
  MYH1: {
    en: "MYH1 is the myosin motor of fast-twitch fibres, used for quick, powerful efforts. Sprinters typically have a higher share of fast fibres than marathon runners.",
    it: "MYH1 è il motore di miosina delle fibre rapide, usate per sforzi brevi e potenti. Di solito gli sprinter hanno una quota di fibre rapide più alta dei maratoneti.",
    fr: "MYH1 est le moteur de myosine des fibres rapides, utilisées pour les efforts brefs et puissants. Les sprinteurs ont en général une proportion de fibres rapides plus élevée que les marathoniens.",
  },
  TTN: {
    en: "Titin is the largest protein in the human body, more than 30,000 amino acids long, and acts like a molecular spring that gives muscle its elasticity. Changes in this gene are among the most common genetic causes of an enlarged, weakened heart.",
    it: "La titina è la proteina più grande del corpo umano, lunga oltre 30.000 amminoacidi, e funziona come una molla molecolare che dà elasticità al muscolo. Alterazioni di questo gene sono tra le cause genetiche più comuni di un cuore dilatato e indebolito.",
    fr: "La titine est la plus grande protéine du corps humain, longue de plus de 30 000 acides aminés, et agit comme un ressort moléculaire qui donne au muscle son élasticité. Des altérations de ce gène comptent parmi les causes génétiques les plus fréquentes d'un cœur dilaté et affaibli.",
  },
  CKM: {
    en: "Muscle creatine kinase rapidly regenerates ATP, the cell's energy currency, from a reserve called phosphocreatine. When muscle is damaged it leaks into the blood, so high levels are a sign of muscle injury.",
    it: "La creatina chinasi muscolare rigenera rapidamente l'ATP, la 'moneta energetica' della cellula, a partire da una riserva chiamata fosfocreatina. Quando il muscolo si danneggia passa nel sangue, e livelli elevati indicano una lesione muscolare.",
    fr: "La créatine kinase musculaire régénère rapidement l'ATP, la « monnaie énergétique » de la cellule, à partir d'une réserve appelée phosphocréatine. Quand le muscle est lésé, elle passe dans le sang : un taux élevé signale une atteinte musculaire.",
  },
  DES: {
    en: "Desmin is a filament that keeps the contractile units of muscle cells aligned and connected. It is found in every type of muscle, including the heart, and its defects can weaken both skeletal and heart muscle.",
    it: "La desmina è un filamento che tiene allineate e collegate le unità contrattili delle cellule muscolari. Si trova in tutti i tipi di muscolo, cuore compreso, e i suoi difetti possono indebolire sia i muscoli scheletrici sia il cuore.",
    fr: "La desmine est un filament qui maintient alignées et reliées les unités contractiles des cellules musculaires. On la trouve dans tous les types de muscle, cœur compris, et ses défauts peuvent affaiblir à la fois les muscles squelettiques et le cœur.",
  },

  // Adipose
  ADIPOQ: {
    en: "Adiponectin is a hormone released by fat cells that makes the body more sensitive to insulin. Unexpectedly, its levels are lower in people with obesity.",
    it: "L'adiponectina è un ormone rilasciato dalle cellule adipose che rende il corpo più sensibile all'insulina. Sorprendentemente, i suoi livelli sono più bassi nelle persone con obesità.",
    fr: "L'adiponectine est une hormone libérée par les cellules graisseuses qui rend le corps plus sensible à l'insuline. Étonnamment, son taux est plus bas chez les personnes obèses.",
  },
  LEP: {
    en: "Leptin is a hormone from fat cells that tells the brain how much energy is stored, helping to regulate appetite. People born unable to make it feel constant hunger and develop severe obesity.",
    it: "La leptina è un ormone delle cellule adipose che informa il cervello su quanta energia è immagazzinata, aiutando a regolare l'appetito. Le persone nate senza la capacità di produrla hanno una fame costante e sviluppano un'obesità grave.",
    fr: "La leptine est une hormone des cellules graisseuses qui informe le cerveau de l'énergie stockée et aide à réguler l'appétit. Les personnes nées incapables d'en produire ont une faim constante et développent une obésité sévère.",
  },
  FABP4: {
    en: "FABP4 shuttles fatty acids inside fat cells, to and from their storage droplets. Mice lacking it are partly protected from diabetes and atherosclerosis, so it is studied as a drug target.",
    it: "FABP4 trasporta gli acidi grassi all'interno delle cellule adipose, da e verso le goccioline di deposito. I topi che ne sono privi sono in parte protetti da diabete e aterosclerosi, per cui è studiato come bersaglio di farmaci.",
    fr: "FABP4 transporte les acides gras à l'intérieur des cellules graisseuses, vers et depuis leurs gouttelettes de stockage. Les souris qui en sont dépourvues sont en partie protégées du diabète et de l'athérosclérose : c'est une cible thérapeutique étudiée.",
  },
  PLIN1: {
    en: "Perilipin 1 coats the fat droplets inside fat cells and controls when stored fat can be released. Inherited defects cause a rare condition in which the body cannot store fat properly.",
    it: "La perilipina 1 riveste le gocce di grasso nelle cellule adipose e controlla quando il grasso di riserva può essere liberato. Difetti ereditari causano una rara condizione in cui il corpo non riesce a immagazzinare correttamente il grasso.",
    fr: "La périlipine 1 enrobe les gouttelettes de graisse des cellules adipeuses et contrôle le moment où les réserves peuvent être libérées. Des défauts héréditaires provoquent une maladie rare dans laquelle le corps ne parvient pas à stocker correctement les graisses.",
  },
  LIPE: {
    en: "Hormone-sensitive lipase is one of the key enzymes that break stored fat into fatty acids the body can burn for energy. It is switched on by adrenaline during fasting or exercise and switched off by insulin after a meal.",
    it: "La lipasi ormono-sensibile è uno degli enzimi chiave che scompongono il grasso di riserva in acidi grassi che il corpo può bruciare per produrre energia. Viene attivata dall'adrenalina durante il digiuno o l'esercizio e spenta dall'insulina dopo un pasto.",
    fr: "La lipase hormono-sensible est l'une des enzymes clés qui découpent les graisses stockées en acides gras que le corps peut brûler pour produire de l'énergie. Elle est activée par l'adrénaline à jeun ou pendant l'effort, et désactivée par l'insuline après un repas.",
  },

  // Blood
  HBB: {
    en: "Beta globin is one of the two types of chain in haemoglobin, the protein that carries oxygen in red blood cells. A single-letter change in this gene causes sickle cell disease.",
    it: "La beta globina è uno dei due tipi di catena dell'emoglobina, la proteina che trasporta l'ossigeno nei globuli rossi. Il cambiamento di una sola lettera in questo gene causa l'anemia falciforme.",
    fr: "La bêta-globine est l'un des deux types de chaîne de l'hémoglobine, la protéine qui transporte l'oxygène dans les globules rouges. Le changement d'une seule lettre de ce gène provoque la drépanocytose.",
  },
  HBA1: {
    en: "Alpha globin is the other haemoglobin chain: two alpha and two beta chains together carry four oxygen molecules. Missing copies of the alpha genes cause alpha thalassaemia, a common inherited anaemia around the Mediterranean.",
    it: "L'alfa globina è l'altra catena dell'emoglobina: due catene alfa e due beta insieme trasportano quattro molecole di ossigeno. La mancanza di copie dei geni alfa causa l'alfa talassemia, un'anemia ereditaria diffusa nell'area mediterranea.",
    fr: "L'alpha-globine est l'autre chaîne de l'hémoglobine : deux chaînes alpha et deux bêta transportent ensemble quatre molécules d'oxygène. L'absence de copies des gènes alpha provoque l'alpha-thalassémie, une anémie héréditaire fréquente autour de la Méditerranée.",
  },
  ALAS2: {
    en: "ALAS2 carries out the first step in making heme, the iron-containing part of haemoglobin that binds oxygen, in developing red blood cells. Inherited defects cause a rare anaemia in which iron builds up without being used.",
    it: "ALAS2 compie il primo passo nella produzione dell'eme, la parte dell'emoglobina che contiene ferro e lega l'ossigeno, nei globuli rossi in formazione. Difetti ereditari causano una rara anemia in cui il ferro si accumula senza essere utilizzato.",
    fr: "ALAS2 réalise la première étape de la fabrication de l'hème, la partie de l'hémoglobine qui contient le fer et fixe l'oxygène, dans les globules rouges en formation. Des défauts héréditaires provoquent une anémie rare où le fer s'accumule sans être utilisé.",
  },
  SELL: {
    en: "L-selectin lets white blood cells grab and roll along the walls of blood vessels. It drives the first step that allows them to leave the blood and enter lymph nodes or sites of infection.",
    it: "La L-selectina permette ai globuli bianchi di aggrapparsi e rotolare lungo le pareti dei vasi sanguigni. Guida il primo passo che consente loro di uscire dal sangue ed entrare nei linfonodi o nei siti di infezione.",
    fr: "La L-sélectine permet aux globules blancs de s'accrocher et de rouler le long des parois des vaisseaux sanguins. Elle assure la première étape qui leur permet de quitter le sang pour gagner les ganglions lymphatiques ou les sites d'infection.",
  },
  CD19: {
    en: "CD19 sits on the surface of B cells, the white blood cells that produce antibodies, and helps them respond to infections. CAR-T cell therapies for some leukaemias and lymphomas are designed to hunt cells carrying it.",
    it: "CD19 si trova sulla superficie dei linfociti B, i globuli bianchi che producono anticorpi, e li aiuta a rispondere alle infezioni. Le terapie CAR-T per alcune leucemie e linfomi sono progettate per colpire le cellule che lo espongono.",
    fr: "CD19 se trouve à la surface des lymphocytes B, les globules blancs qui produisent les anticorps, et les aide à répondre aux infections. Les thérapies CAR-T contre certaines leucémies et lymphomes sont conçues pour cibler les cellules qui le portent.",
  },

  // Thyroid
  TG: {
    en: "Thyroglobulin is a giant protein that the thyroid uses as a scaffold on which thyroid hormones are built. After surgery for thyroid cancer, its level in the blood is monitored to check that the disease has not returned.",
    it: "La tireoglobulina è una proteina gigante che la tiroide usa come impalcatura su cui costruire gli ormoni tiroidei. Dopo l'intervento per un tumore della tiroide, il suo livello nel sangue viene controllato per verificare che la malattia non sia tornata.",
    fr: "La thyroglobuline est une protéine géante que la thyroïde utilise comme échafaudage pour fabriquer ses hormones. Après une chirurgie pour cancer de la thyroïde, son taux sanguin est surveillé pour vérifier que la maladie n'est pas revenue.",
  },
  TPO: {
    en: "Thyroid peroxidase attaches iodine to thyroglobulin, a key step in making thyroid hormones. Antibodies against it are a hallmark of Hashimoto's thyroiditis, and common antithyroid drugs work by blocking it.",
    it: "La perossidasi tiroidea attacca lo iodio alla tireoglobulina, un passaggio chiave nella produzione degli ormoni tiroidei. Gli anticorpi contro di essa sono tipici della tiroidite di Hashimoto, e i comuni farmaci antitiroidei agiscono bloccandola.",
    fr: "La thyroperoxydase fixe l'iode sur la thyroglobuline, une étape clé de la fabrication des hormones thyroïdiennes. Les anticorps dirigés contre elle sont typiques de la thyroïdite de Hashimoto, et les antithyroïdiens courants agissent en la bloquant.",
  },
  TSHR: {
    en: "TSHR is the receptor that receives the signal from the pituitary gland telling the thyroid to grow and make hormone. In Graves' disease, antibodies keep it switched on, causing an overactive thyroid.",
    it: "TSHR è il recettore che riceve dall'ipofisi il segnale che fa crescere la tiroide e produrre ormone. Nel morbo di Basedow-Graves gli anticorpi lo tengono acceso, causando un ipertiroidismo.",
    fr: "TSHR est le récepteur qui reçoit de l'hypophyse le signal ordonnant à la thyroïde de grandir et de produire son hormone. Dans la maladie de Basedow, des anticorps le maintiennent allumé, ce qui provoque une hyperthyroïdie.",
  },
  IYD: {
    en: "IYD recovers iodine from leftover hormone building blocks so the thyroid can reuse it. Without it iodine is lost in the urine, and inherited defects cause hypothyroidism.",
    it: "IYD recupera lo iodio dai mattoncini di ormone avanzati, così la tiroide può riutilizzarlo. Senza di essa lo iodio si perde nelle urine, e difetti ereditari causano ipotiroidismo.",
    fr: "IYD récupère l'iode des briques d'hormone inutilisées pour que la thyroïde puisse le réutiliser. Sans elle, l'iode est perdu dans l'urine, et des défauts héréditaires provoquent une hypothyroïdie.",
  },
  PAX8: {
    en: "PAX8 is a master switch that tells cells to become thyroid tissue during development and keeps hormone genes active. Inherited defects can cause congenital hypothyroidism, and it is also active in the kidney.",
    it: "PAX8 è un interruttore principale che durante lo sviluppo dice alle cellule di diventare tessuto tiroideo e mantiene attivi i geni degli ormoni. Difetti ereditari possono causare ipotiroidismo congenito; è attivo anche nel rene.",
    fr: "PAX8 est un interrupteur maître qui, pendant le développement, indique aux cellules de devenir du tissu thyroïdien et maintient actifs les gènes hormonaux. Des défauts héréditaires peuvent causer une hypothyroïdie congénitale ; il est aussi actif dans le rein.",
  },
};

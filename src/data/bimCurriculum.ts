import { BIMModule } from '../types';

export const BIM_MODULES: BIMModule[] = [
  {
    id: 'bim-fundamentals',
    number: 1,
    title: 'BIM Foundations & Industry Frameworks',
    tagline: 'From 2D CAD drafting to parametric databases, ISO 19650, CDE, and LOD standards.',
    readTime: '12 min',
    iconName: 'Building2',
    color: 'from-cyan-500 to-blue-600',
    summary: 'Master the fundamental definition of BIM as an intelligent relational database, explore the dimensions (3D to 7D), understand the ISO 19650 Common Data Environment (CDE), and navigate Level of Development (LOD).',
    sections: [
      {
        id: 'what-is-bim',
        title: 'What is BIM? (Database vs. Geometry)',
        subtitle: 'Why BIM is fundamentally different from traditional 2D/3D CAD drafting.',
        content: [
          'Building Information Modeling (BIM) is not merely a 3D visualization or a software tool like Autodesk Revit or Graphisoft ArchiCAD. It is a collaborative digital process where a building is simulated as an object-oriented, relational database of intelligent parametric elements.',
          'In traditional CAD (Computer-Aided Design), a line is just vector geometry with color and layer properties. If you change a wall in floor plan CAD, you must manually update the elevation, section, and quantity spreadsheet.',
          'In BIM, a wall is an intelligent parametric entity that knows its composite layers, thermal resistance (R-value), acoustic rating, structural load-bearing capacity, volume, manufacturer, and cost. If you move a wall in a plan view, it automatically updates in all 3D views, sections, schedules, and quantity takeoffs in real time.'
        ],
        keyTakeaways: [
          'BIM is a database: geometry + metadata (parameters).',
          'Parametric relationships ensure bidirectional associativity (changes propagate instantly to all views and schedules).',
          'BIM spans the entire facility lifecycle from design through demolition.'
        ],
        proTip: 'In job interviews or onboarding meetings, never refer to BIM as "just 3D CAD". Emphasize that BIM is an information management lifecycle methodology that optimizes communication, coordination, and cost certainty.',
        watchOutWarning: 'Watch out for "CAD in disguise": drawing 2D lines and text over a 3D model instead of modeling proper parametric elements with accurate metadata is the #1 mistake junior modelers make.'
      },
      {
        id: 'bim-dimensions',
        title: 'The Dimensions of BIM (3D to 7D)',
        subtitle: 'How information layers transform a geometric model into a total lifecycle asset.',
        content: [
          'The industry categorizes BIM information maturity into distinct "Dimensions":',
          '• 3D BIM (Spatial & Geometric Modeling): Parametric geometry, spatial relationships, walk-throughs, and multi-discipline clash detection.',
          '• 4D BIM (Time & Construction Sequencing): Linking the 3D model elements to project schedules (Gantt charts, Primavera P6, MS Project) to simulate staging, logistics, and crane clearances over time.',
          '• 5D BIM (Cost Estimation & Quantity Takeoff): Real-time derivation of material quantities and cost rates from element parameters, enabling live budget impact analysis.',
          '• 6D BIM (Sustainability & Energy Performance): Daylighting analysis, embodied carbon calculation, solar radiation studies, and operational energy simulation.',
          '• 7D BIM (Facility Management & Asset Handover): Commissioning data, warranty periods, maintenance intervals, and serial numbers handed over to building owners (often via COBie).'
        ],
        keyTakeaways: [
          '3D = Geometry & Coordination',
          '4D = Scheduling & Logistics',
          '5D = Cost & Quantities',
          '6D = Environmental Sustainability',
          '7D = Operations & Facility Maintenance'
        ],
        diagramType: 'dimensions',
        proTip: 'Most junior modelers spend 80% of their time on 3D spatial modeling and 2D documentation, but having an awareness of 4D/5D data requirements will immediately set you apart as a high-value hire.'
      },
      {
        id: 'iso-19650-cde',
        title: 'ISO 19650 & The Common Data Environment (CDE)',
        subtitle: 'The international standard governing how project information is authored, verified, and shared.',
        content: [
          'ISO 19650 is the global benchmark standard for managing information throughout a built asset life cycle using BIM. At the center of ISO 19650 is the Common Data Environment (CDE) — a single, cloud-hosted or server-based source of truth (such as Autodesk Construction Cloud / BIM 360, Trimble Connect, or Bentley ProjectWise).',
          'The CDE workflow enforces four strictly governed information containers:',
          '1. Work in Progress (WIP): The authoring team\'s private workspace (e.g., your architecture or MEP team). Internal drafts, not visible to other disciplines.',
          '2. Shared: Information that has been internally checked, verified, and published for cross-discipline coordination and review. Structural engineers link the architect\'s Shared model, not their WIP model.',
          '3. Published: Contractual deliverables approved by the client/lead consultant for construction, tendering, or statutory approval (signed drawings, official IFCs).',
          '4. Archive: Permanent audit trail of all historical milestones, revisions, and as-built records for legal protection and warranty tracking.'
        ],
        keyTakeaways: [
          'Never link directly to an external team’s WIP folder; always link to approved "Shared" containers.',
          'Every revision moves through QA/QC gateways before status promotion.',
          'Maintains accountability and prevents contractors from building from unapproved drafts.'
        ],
        diagramType: 'cde_lifecycle',
        proTip: 'On your first day, ask your BIM Manager: "Where is the approved Shared folder in our CDE, and what is our model publish cadence?" This proves you understand industry-standard coordination hygiene.'
      },
      {
        id: 'eir-and-bep',
        title: 'EIR vs. BEP: The Rulebooks of Every Project',
        subtitle: 'The two critical documents that dictate your daily modeling standards.',
        content: [
          'Before anyone draws a single wall or duct, two essential documents define the rules of engagement:',
          '• EIR (Exchange Information Requirements / Employer’s Information Requirements): Issued by the client or project owner. It specifies WHAT information they require, WHEN they need it, and in WHAT format (e.g., "All MEP equipment must include manufacturer serial numbers and maintenance clearance zones formatted for COBie").',
          '• BEP (BIM Execution Plan): Authored by the lead design/construction team in response to the EIR. It outlines HOW the requirements will be met. The BEP specifies software versions (e.g., "Revit 2024.2"), coordinate origins, naming conventions, workset structures, clash detection tolerances, model delivery milestones, and team roles.'
        ],
        keyTakeaways: [
          'EIR = The Client\'s "What & When" requirements.',
          'BEP = The Delivery Team\'s "How & Who" execution manual.',
          'The BEP is your daily Bible for naming conventions, shared coordinates, and file formats.'
        ],
        watchOutWarning: 'Always confirm the exact software version and service pack stated in the BEP. Opening a Revit project in a newer version (e.g. Revit 2024 instead of 2023) will permanently upgrade the file, potentially corrupting project-wide worksharing!'
      },
      {
        id: 'lod-framework',
        title: 'Level of Development (LOD 100 - 500)',
        subtitle: 'Understanding geometric detail vs. reliable informational content.',
        content: [
          'Defined by BIMForum and AIA, Level of Development (LOD) establishes how much reliance project stakeholders can place on a modeled element at various milestones:',
          '• LOD 100 (Conceptual): Generic massing, volume, area, orientation. No specific shape or dimensions.',
          '• LOD 200 (Generic System): Approximate size, shape, location, and orientation. E.g., a generic 8" wall or generic rectangular duct run.',
          '• LOD 300 (Specific Assembly): Specific dimensions, quantity, location, orientation, and material. E.g., a specific metal stud wall with 5/8" Type X drywall, or a specific rectangular supply air duct.',
          '• LOD 350 (Interfacing & Connections): Model elements include connection details, supports, penetrations, and interfaces with adjacent systems (vital for trade coordination and clash detection).',
          '• LOD 400 (Fabrication & Assembly): Complete fabrication-level detail with shop drawing tolerances, weld specs, bolt assemblies, sheet metal joints, and installation instructions.',
          '• LOD 500 (As-Built / Field Verified): Field-measured, verified representation of installed conditions in terms of size, shape, location, and maintenance metadata.'
        ],
        keyTakeaways: [
          'LOD is NOT Level of Detail (which is just visual geometry); it is Level of Development (reliance on geometry + data).',
          'Over-modeling too early (e.g., drawing LOD 400 bolts during schematic design) slows down software and wastes billable hours.',
          'Under-modeling late in design (e.g., leaving critical MEP clearances at LOD 200) causes expensive field conflicts.'
        ],
        diagramType: 'lod_comparison'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What fundamentally differentiates a BIM element (like a wall in Revit) from a 2D CAD line?',
        options: [
          'BIM elements can only be viewed in 3D perspective views.',
          'BIM elements are parametric database objects carrying physical metadata, materials, and bidirectional view updates.',
          'BIM elements have smaller file sizes than CAD drawings.',
          'BIM elements do not allow geometric measurements or dimensions.'
        ],
        correctIndex: 1,
        explanation: 'BIM is an object-oriented database. Elements contain geometric parameters, specifications, thermal properties, and relationships that update dynamically across all drawings and schedules.',
        topicTag: 'BIM Core Concept'
      },
      {
        id: 'q1-2',
        question: 'Which BIM dimension specifically links 3D geometric elements to project construction schedules and time sequencing?',
        options: ['4D BIM', '5D BIM', '6D BIM', '7D BIM'],
        correctIndex: 0,
        explanation: '4D BIM introduces the element of Time. It integrates 3D models with project schedule Gantt charts (e.g. Primavera P6 or MS Project) to simulate construction staging and logistics.',
        topicTag: 'BIM Dimensions'
      },
      {
        id: 'q1-3',
        question: 'In an ISO 19650 compliant Common Data Environment (CDE), where should the structural engineer obtain the architectural model for weekly linking?',
        options: [
          'From the Architect’s private Work In Progress (WIP) directory.',
          'From the client’s Published archive folder.',
          'From the verified "Shared" information container.',
          'From an email attachment or personal Dropbox.'
        ],
        correctIndex: 2,
        explanation: 'Under ISO 19650, only models in the "Shared" container have been verified and approved by discipline leads for cross-team coordination.',
        topicTag: 'ISO 19650 / CDE'
      },
      {
        id: 'q1-4',
        question: 'What is the primary difference between an EIR and a BEP?',
        options: [
          'The EIR is an architectural drawing; the BEP is an MEP schedule.',
          'The EIR defines the client’s information requirements (What/When); the BEP is the delivery team’s plan outlining execution procedures (How/Who).',
          'The EIR is written in AutoCAD; the BEP is written in Revit.',
          'The EIR is for 4D simulation; the BEP is only for 5D cost estimating.'
        ],
        correctIndex: 1,
        explanation: 'EIR (Exchange Information Requirements) comes from the client. BEP (BIM Execution Plan) is authored by the design/contractor team detailing how they will deliver those requirements.',
        topicTag: 'Project Governance'
      },
      {
        id: 'q1-5',
        question: 'At which Level of Development (LOD) are element interfaces, supports, and connection clearances modeled to facilitate trade coordination?',
        options: ['LOD 100', 'LOD 200', 'LOD 350', 'LOD 500'],
        correctIndex: 2,
        explanation: 'LOD 350 specifically defines the interfaces and connections between building systems (such as pipe hangers, penetrations, and structural embeds) required for multi-trade clash coordination.',
        topicTag: 'LOD Specifications'
      }
    ],
    scenario: {
      id: 'sc-1',
      title: 'Day 1 Software Version Dilemma',
      roleContext: 'You are a newly hired junior modeler at an engineering firm. Your team lead sends you a project file named "Tower_Core_MEP.rvt". Your desktop computer has Revit 2024 installed, but the project BIM Execution Plan specifies Revit 2023.2.',
      dilemma: 'What should you do before opening or modifying the file?',
      options: [
        {
          text: 'Open the file in Revit 2024 immediately and save it so your team benefits from the newer software features.',
          consequence: 'Disaster! Opening in 2024 one-way upgrades the central model. None of your teammates or consulting architects in Revit 2023 can now open or link the model, halting project work.',
          isOptimal: false,
          scoreAwarded: 0
        },
        {
          text: 'Open the file, export it as a DWG, and draft everything in AutoCAD to avoid software issues.',
          consequence: 'Defeats the entire purpose of BIM. You lose parametric relationships, metadata, and 3D coordination.',
          isOptimal: false,
          scoreAwarded: 20
        },
        {
          text: 'Verify the version specified in the BEP, halt opening in Revit 2024, and install/launch Revit 2023.2 to strictly align with project standards.',
          consequence: 'Excellent industry practice! You respected project governance, prevented accidental central model corruption, and demonstrated senior-level diligence on day one.',
          isOptimal: true,
          scoreAwarded: 100
        }
      ],
      industryStandardReference: 'ISO 19650 and standard BEP governance mandate strict adherence to authoring software versions. Revit files are not backward-compatible.'
    }
  },
  {
    id: 'modeling-workflows',
    number: 2,
    title: 'Modeling Workflows & Central Worksharing',
    tagline: 'Central models, local files, worksets, synchronize-with-central, and shared coordinates.',
    readTime: '15 min',
    iconName: 'GitMerge',
    color: 'from-amber-500 to-orange-600',
    summary: 'Discover how multi-user worksharing operates behind the scenes, master the lifecycle of Central vs Local files, learn workset borrowing etiquette, and understand Project Base Point vs Survey Point.',
    sections: [
      {
        id: 'central-vs-local',
        title: 'Central Model vs. Local Files: The Golden Rule',
        subtitle: 'The collaborative architecture that allows 20 modelers to work on one building simultaneously.',
        content: [
          'In production BIM environments, projects are not single standalone files edited on someone\'s desktop. They rely on Revit Worksharing (or ACC / BIM 360 Cloud Worksharing).',
          'The system divides into two components:',
          '1. The Central Model: Stored on the central server or cloud hub. It is the master repository of all design history, worksets, and current geometry.',
          '2. The Local Model: Stored on your local C: drive (e.g., `Hospital_Arch_Local_Ryan.rvt`). You work exclusively in your local copy.',
          'THE GOLDEN RULE OF BIM: NEVER double-click and open the Central Model directly for daily modeling work. Always create a new Local copy. Opening the Central directly locks the file and prevents other team members from synchronizing!'
        ],
        keyTakeaways: [
          'Central Model = The master cloud/server repository.',
          'Local Model = Your personal working workspace on your PC.',
          'Always check "Create New Local" when opening through Revit’s open dialog.'
        ],
        proTip: 'When you open a project from the Revit home screen or File > Open, ensure the "Create New Local" checkbox at the bottom of the dialog box is checked and greyed out. If it says "Detach from Central", ask why before clicking!'
      },
      {
        id: 'worksets-and-borrowing',
        title: 'Worksets & Element Borrowing Etiquette',
        subtitle: 'How permissions, check-outs, and relinquishing prevent modeling conflicts.',
        content: [
          'A Workset is a collection of elements in a workshared model (e.g., `Shared Levels & Grids`, `Exterior Envelope`, `Interior Partitions`, `MEP Supply Air`).',
          'Worksets serve two primary purposes:',
          '1. Display Performance: You can turn off entire heavy worksets (like structural framing or detailed furniture) to make your computer run faster.',
          '2. Access Control & Element Borrowing: In modern Revit, you rarely need to "check out" entire worksets exclusively. When you modify a wall or duct, Revit automatically "borrows" that individual element for you.',
          'If a colleague tries to move that same wall, Revit displays an Editing Request notification. You must grant permission or synchronize your file to release the element.',
          'At the end of your shift, when synchronizing, always check "Relinquish All Mine" (Borrowed Elements and User-created Worksets). Never leave for vacation while holding ownership of key levels or core walls!'
        ],
        keyTakeaways: [
          'Always verify which workset is set to "Active" before placing new elements.',
          'Never place model geometry on the "Shared Levels & Grids" workset.',
          'Always Relinquish Borrowed Elements when performing your final Synchronize with Central (SWC).'
        ],
        watchOutWarning: 'Accidentally modeling hundreds of interior partition walls while the active workset is set to "Shared Levels & Grids" is a nightmare to clean up later. Always double-check your Active Workset dropdown in the bottom status bar!'
      },
      {
        id: 'swc-sync-process',
        title: 'Synchronize with Central (SWC) Step-by-Step',
        subtitle: 'The protocol for saving local changes back to the team repository.',
        content: [
          'Saving locally (Ctrl+S) only saves changes to your computer\'s hard drive. Your teammates cannot see your new walls or ducts until you Synchronize with Central.',
          'The ideal synchronization workflow:',
          '1. Notify your immediate pod if doing a heavy sync (especially in large central models).',
          '2. Click "Synchronize and Modify Settings" (Ctrl+Alt+S or Collaborate ribbon).',
          '3. Check "Compact Central Model" periodically (reduces file bloating and cleans database fragments).',
          '4. Ensure "Borrowed Elements" and "User-created Worksets" are checked under Relinquish.',
          '5. Add a brief sync comment if you made a major layout change (e.g., "Shifted riser shaft 400mm east per structural request").'
        ],
        keyTakeaways: [
          'Sync frequently (every 1-2 hours) to avoid huge divergence and merge conflicts.',
          'Never force-terminate Revit while a sync progress bar is moving.'
        ],
        proTip: 'Never synchronize at the exact same second as a teammate sitting next to you on a local network. One will experience a lock delay. Stagger your syncs by 30 seconds!'
      },
      {
        id: 'coordinate-systems',
        title: 'Coordinate Systems: Project Base Point vs. Survey Point',
        subtitle: 'Why discipline models link in the exact same physical space without offset errors.',
        content: [
          'One of the most confusing hurdles for new BIM modelers is spatial coordinates. Revit uses three distinct coordinate markers:',
          '1. Internal Origin (Absolute 0,0,0): The unmovable start point of the software’s internal Cartesian space.',
          '2. Project Base Point (Blue Circle with X): Represents the local project datum (e.g., the intersection of structural grid A and grid 1 at finished floor Level 1). Used for engineering measurements on site.',
          '3. Survey Point (Blue Triangle with +): Represents a real-world, georeferenced geodetic datum (e.g., state plane coordinates, national grid, elevation above sea level).',
          'True North vs. Project North: Project North rotates the building on your sheet so walls align square with your screen for neat drafting. True North aligns with the actual magnetic/geographic North pole for solar and site positioning.',
          'Shared Coordinates: When linking the Architectural model into the Structural or MEP model, always link by "Auto - By Shared Coordinates" (or "Auto - Origin to Origin" if established in the BEP).'
        ],
        keyTakeaways: [
          'Project Base Point = Local design origin (Grid A1, Level 1).',
          'Survey Point = Real-world georeferenced benchmark (GIS / Civil tie-in).',
          'Never move the Project Base Point or Survey Point unclipped without express approval from your BIM Manager.'
        ],
        watchOutWarning: 'Linking models by "Auto - Center to Center" is unpredictable because the center moves whenever someone adds an exterior fence or far-away survey marker. Stick to "Shared Coordinates" or "Origin to Origin".'
      },
      {
        id: 'linking-vs-importing',
        title: 'Linking vs. Importing (CAD Hygiene)',
        subtitle: 'Why exploding a CAD file in Revit will get you flagged by your BIM Manager.',
        content: [
          'During design, you will frequently receive 2D backgrounds from civil surveyors, interior designers, or equipment manufacturers as AutoCAD DWG files.',
          'Rule #1: ALWAYS Link CAD, NEVER Import CAD into production central models. Linking creates an external reference that can be unloaded and reloaded cleanly. Importing permanently embeds alien geometry into the Revit database.',
          'Rule #2: NEVER EXPLODE A CAD FILE. Exploding a DWG in Revit floods your project database with hundreds of non-standard line styles, layer pens, hatch patterns, and unpurgeable text fonts, causing irreversible model lag and file corruption.'
        ],
        keyTakeaways: [
          'Link CAD = clean, unloadable reference.',
          'Import CAD = bloats project database.',
          'Exploding CAD = project sabotage.'
        ],
        proTip: 'If you must use a manufacturer\'s 2D CAD detail, open it in AutoCAD first, run `PURGE` and `AUDIT`, save it into a temporary standalone family file, clean it up there, and never explode it directly inside the main architectural central file.'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the correct protocol when starting your daily modeling shift on a workshared BIM project?',
        options: [
          'Navigate to the server, double-click the Central Model file directly, and start modeling.',
          'Open Revit, use the Open dialog with "Create New Local" checked to create an updated local copy on your hard drive, and work in that local file.',
          'Copy the Central model onto a USB stick, rename it, and work offline.',
          'Delete the Central model and recreate it from scratch.'
        ],
        correctIndex: 1,
        explanation: 'Always create a fresh Local copy from the Central Model. Working directly in the Central Model locks it for other users and risks model corruption.',
        topicTag: 'Worksharing Fundamentals'
      },
      {
        id: 'q2-2',
        question: 'What happens when you edit an element in Revit that is not checked out by anyone else?',
        options: [
          'Revit crashes and prevents the action.',
          'Revit automatically "borrows" that individual element for you, allowing you to edit it while keeping the rest of the workset open for colleagues.',
          'The element is automatically deleted from the Central model.',
          'All other users are immediately disconnected from the network.'
        ],
        correctIndex: 1,
        explanation: 'Modern BIM worksharing uses transparent element borrowing. When you modify an available element, Revit claims ownership of that specific element until you synchronize and relinquish.',
        topicTag: 'Element Borrowing'
      },
      {
        id: 'q2-3',
        question: 'Before heading out on a 2-week vacation, what step must you ensure is completed during your final Synchronize with Central?',
        options: [
          'Select "Detach from Central".',
          'Turn off your computer while the sync is at 50%.',
          'Ensure "Borrowed Elements" and "User-created Worksets" are checked to Relinquish all ownership.',
          'Hide all model categories in the 3D view.'
        ],
        correctIndex: 2,
        explanation: 'Relinquishing all borrowed elements and worksets ensures that your colleagues can edit, move, and coordinate those elements while you are away without encountering editing permission blocks.',
        topicTag: 'Sync Hygiene'
      },
      {
        id: 'q2-4',
        question: 'Why is exploding an imported AutoCAD (.dwg) file inside a Revit central project considered dangerous practice?',
        options: [
          'It permanently turns the 3D model into black and white lines.',
          'It injects dozens of foreign layers, line styles, and hatch patterns into the Revit database, causing severe file bloating and corruption.',
          'It automatically emails all client contacts with the CAD file.',
          'It converts all ductwork into structural concrete.'
        ],
        correctIndex: 1,
        explanation: 'Exploding CAD introduces foreign DWG layer definitions, text styles, and line weights into Revit’s clean object styles, degrading performance and polluting schedules.',
        topicTag: 'CAD Hygiene'
      },
      {
        id: 'q2-5',
        question: 'What is the primary difference between the Project Base Point and the Survey Point in Revit?',
        options: [
          'The Project Base Point is for 2D views; the Survey Point is for 3D views only.',
          'The Project Base Point establishes local project measurement datum (e.g. grid intersection A1), while the Survey Point establishes real-world georeferenced coordinates (e.g. state plane benchmarks).',
          'The Project Base Point cannot be seen in plan view.',
          'The Survey Point is only used in structural engineering.'
        ],
        correctIndex: 1,
        explanation: 'The Project Base Point establishes the internal datum for building geometry and site dimensions, whereas the Survey Point anchors the model to real-world geodetic coordinate systems.',
        topicTag: 'Coordinates'
      }
    ],
    scenario: {
      id: 'sc-2',
      title: 'The "Someone has this element checked out" Blocker',
      roleContext: 'It is 4:45 PM on Friday. You need to adjust a set of curtain wall mullions on Level 3 before leaving. When you attempt to move the mullions, a Revit warning box appears: "Cannot edit the element. It is checked out by modeler David_W."',
      dilemma: 'David is away from his desk. How should you proceed?',
      options: [
        {
          text: 'Walk over to David’s unlocked computer, open his Revit, force-save the Central file, and close his machine.',
          consequence: 'Extremely risky and violates office security. You risk corrupting David’s unsynchronized work or causing merge conflicts.',
          isOptimal: false,
          scoreAwarded: 10
        },
        {
          text: 'Send an in-software Editing Request, ping David on Slack/Teams asking if he can do a quick Synchronize and Relinquish, or consult your BIM Manager if David has already left for the day.',
          consequence: 'Spot-on professional workflow. Sending an editing request logs the transaction cleanly. If David has departed, the BIM Manager has administrative rights to handle ownership safely.',
          isOptimal: true,
          scoreAwarded: 100
        },
        {
          text: 'Duplicate the curtain wall, place a second one directly overlapping the first, and hide David’s wall in the view.',
          consequence: 'Terrible practice. Overlapping geometry causes double-counted quantities in schedules, clashes in Navisworks, and drawing confusion.',
          isOptimal: false,
          scoreAwarded: 0
        }
      ],
      industryStandardReference: 'Revit Worksharing protocols dictate using Editing Requests and coordinating with the BIM Manager for administrative override when users are offline.'
    }
  },
  {
    id: 'software-fundamentals',
    number: 3,
    title: 'Software Fundamentals & Element Hierarchy',
    tagline: 'Categories, families, types, instances, parameters, view templates, and parametric schedules.',
    readTime: '14 min',
    iconName: 'Layers',
    color: 'from-emerald-500 to-teal-600',
    summary: 'Decode the fundamental taxonomy of BIM software (Category -> Family -> Type -> Instance), understand System vs Loadable families, master Type vs Instance parameters, and configure View Templates.',
    sections: [
      {
        id: 'element-taxonomy',
        title: 'The BIM Object Hierarchy: Category, Family, Type, Instance',
        subtitle: 'The foundational 4-tier tree that organizes every piece of information.',
        content: [
          'Everything in a BIM authoring tool sits inside a strict object taxonomy:',
          '1. Category (Broadest): Hard-coded by the software. Examples: Doors, Windows, Walls, Structural Framing, Duct Accessories, Plumbing Fixtures. You cannot create new categories.',
          '2. Family (The Grouping): A collection of elements sharing a common graphic representation and identical set of parameter definitions. Examples: "Single-Flush Timber Door", "Rectangular Concrete Column", "Round Supply Diffuser".',
          '3. Type (The Sub-variation): A specific preset size or style within that family. Examples: "36\" x 84\" Solid Core", "24\" x 24\" Concrete", "12\" Neck Size Diffuser". Changing a Type parameter changes every element of that type in the entire model!',
          '4. Instance (The Individual Object): The specific, tangible object placed at an exact coordinate on a specific floor level. Example: Door #104 leading into Conference Room B. Changing an Instance parameter affects only that single element.'
        ],
        keyTakeaways: [
          'Category = Fixed software classification (e.g. Doors)',
          'Family = Model component class (e.g. Single-Flush)',
          'Type = Specific size/specification preset (e.g. 36" x 84")',
          'Instance = The individual object in the building (e.g. Door 104)'
        ],
        diagramType: 'element_hierarchy',
        proTip: 'When asked to change a dimension, ALWAYS ask yourself: "Should this change for ALL 50 doors of this type (Type Parameter), or just this one single door (Instance Parameter)?" If only this one, duplicate the type first or use an instance parameter!'
      },
      {
        id: 'family-types-classified',
        title: 'System Families vs. Loadable Families vs. In-Place',
        subtitle: 'Understanding where components come from and when to create them.',
        content: [
          'Revit elements are constructed via three distinct family mechanisms:',
          '1. System Families: Built directly inside the project environment and cannot be exported or saved as external `.rfa` files. Examples: Walls, Roofs, Floors, Ceilings, Stairs, Ducts, and Pipes. They are configured by combining layer materials.',
          '2. Loadable (Component) Families: Authored in external `.rfa` library files and loaded into the project as needed. Examples: Doors, Windows, Light Fixtures, Chillers, Air Handling Units, Furniture, Title Blocks.',
          '3. In-Place Families: Custom one-off geometry modeled directly inside the project context for unique architectural oddities (e.g., a quirky reception desk conforming to an irregular curved concrete slab).',
          'WARNING ABOUT IN-PLACE FAMILIES: Never use in-place families for standard building components. They bloat file size, cannot be easily scheduled or standardized, and cause severe model degradation.'
        ],
        keyTakeaways: [
          'System = Built-in architectural assemblies (Walls, Slabs, Ducts).',
          'Loadable = External modular components (.rfa files).',
          'In-Place = Unique one-off exceptions only. Avoid whenever possible.'
        ],
        watchOutWarning: 'A common rookie error is modeling repeated furniture or equipment as In-Place families. Your BIM Lead will reject the model. Always author a clean Loadable Component family for repeatable elements.'
      },
      {
        id: 'parameters-deep-dive',
        title: 'Parameters: Type vs. Instance & Project vs. Shared',
        subtitle: 'How information is injected into elements for scheduling and tagging.',
        content: [
          'Parameters are the "I" in BIM (Information). They store data values on elements.',
          'Type Parameters vs. Instance Parameters:',
          '• Type: Shared by all instances of that type (e.g., Door Height = 7\'-0", Manufacturer = "VT Industries"). If you change it on one, all 100 doors update.',
          '• Instance: Unique to each individual placed element (e.g., Mark = "104A", Comments = "Card Reader Required", Sill Height = 0").',
          'Project Parameters vs. Shared Parameters:',
          '• Project Parameters: Created inside the project file. They can appear in schedules, but CANNOT be used in external family tags.',
          '• Shared Parameters: Defined in a standardized external shared parameter text file. They CAN be read by both families and projects, meaning they can appear in both Schedules and Annotation Tags simultaneously (crucial for room tags, equipment labels, and fire ratings).'
        ],
        keyTakeaways: [
          'Type changes affect every instance; Instance changes affect only the selected item.',
          'Shared Parameters are mandatory if you want a custom property to appear in both an on-sheet annotation tag and an equipment schedule.'
        ],
        proTip: 'On day one, ask for the firm’s master "Shared Parameter File". Never create rogue custom project parameters if an official shared parameter already exists in your office standard.'
      },
      {
        id: 'view-templates-and-vg',
        title: 'Views, View Templates & Visibility/Graphics (VG/VV)',
        subtitle: 'Controlling graphic standards, line weights, filters, and disciplines.',
        content: [
          'In BIM, drawings are not drawn — they are live, dynamically sliced views through the central database.',
          'Visibility/Graphics Overrides (VG or VV keyboard shortcut): Controls what categories are visible in a specific view, and how they appear (cut line weight, surface pattern, transparency).',
          'View Templates: A saved configuration of view properties (scale, discipline, detail level, VG overrides, model display, view range) that can be applied to 50 floor plans at once to ensure 100% visual consistency.',
          'View Range: Defines the horizontal slicing planes that determine what is visible in plan views: Top, Cut Plane (usually 4\'-0" or 1200mm above floor), Bottom, and View Depth.'
        ],
        keyTakeaways: [
          'If you cannot select or change a graphic setting in a view, check if a View Template is assigned to the view properties.',
          'View Range dictates what is cut vs what is seen in projection.',
          'Use View Filters to highlight specific data (e.g., color all 2-hour fire-rated walls red).'
        ]
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Which of the following correctly describes the BIM object hierarchy from broadest classification to most specific?',
        options: [
          'Instance → Type → Family → Category',
          'Category → Family → Type → Instance',
          'Family → Category → Instance → Type',
          'Type → Family → Category → Instance'
        ],
        correctIndex: 1,
        explanation: 'The standard hierarchy is Category (e.g., Doors) → Family (e.g., Single-Flush) → Type (e.g., 36" x 84") → Instance (the specific physical door with mark #101).',
        topicTag: 'Element Hierarchy'
      },
      {
        id: 'q3-2',
        question: 'You modify the "Door Thickness" parameter of a door from 1-3/4" to 2" in the Type Properties dialog. What happens to the model?',
        options: [
          'Only the currently selected door increases in thickness.',
          'All doors belonging to that specific Type across the entire project will update to 2" thickness.',
          'The door will automatically delete from the wall.',
          'The parameter will have no effect until the project is exported to IFC.'
        ],
        correctIndex: 1,
        explanation: 'Type Parameters govern every instance of that type. To change only a single door without affecting others, you must either duplicate the type or use an instance parameter.',
        topicTag: 'Parameters'
      },
      {
        id: 'q3-3',
        question: 'Which type of family cannot be exported or saved as a separate external .rfa file because it is inherently part of the project database?',
        options: [
          'Loadable Component Families',
          'System Families (e.g. standard walls, basic roofs, floor slabs)',
          'Shared Annotation Families',
          'Profile Families'
        ],
        correctIndex: 1,
        explanation: 'System Families (like walls, roofs, floors, ceilings, ducts) are defined and hosted entirely inside project template environments and cannot exist as standalone .rfa files.',
        topicTag: 'Family Types'
      },
      {
        id: 'q3-4',
        question: 'Why are "Shared Parameters" essential when building custom equipment tags and schedules?',
        options: [
          'They allow properties to be shared simultaneously between the project schedule and external annotation tag families.',
          'They prevent unauthorized people from viewing the model.',
          'They automatically translate parameter names into different languages.',
          'They reduce Revit memory usage by 90%.'
        ],
        correctIndex: 0,
        explanation: 'Shared Parameters use a consistent GUID stored in a master text file, allowing external annotation tags to read and display the exact same parameter that is being scheduled in the project.',
        topicTag: 'Parameters'
      },
      {
        id: 'q3-5',
        question: 'You open a Level 2 HVAC plan and notice the Visibility/Graphics dialog properties are completely greyed out and unclickable. What is the cause?',
        options: [
          'Your Revit license has expired.',
          'A View Template is assigned to the view, locking the graphic overrides to maintain sheet consistency.',
          'The model is locked in 4D mode.',
          'The walls are modeled at LOD 500.'
        ],
        correctIndex: 1,
        explanation: 'When a View Template is active on a view, it standardizes and locks graphic properties. You must either edit the template settings or temporarily set the template to "None".',
        topicTag: 'View Templates'
      }
    ],
    scenario: {
      id: 'sc-3',
      title: 'The "Just Change This One Window" Trap',
      roleContext: 'Your senior architect tells you: "Window #102 on the North Elevation needs to be 48 inches wide instead of 36 inches to meet egress requirements. Please change it right now."',
      dilemma: 'There are 64 other windows in the project using the exact same Type name "Casement - 36x48". How do you execute this task safely?',
      options: [
        {
          text: 'Select Window #102, click Edit Type, change the Width from 36" to 48", and click OK.',
          consequence: 'Disaster! Because you edited the existing Type, all 64 other windows throughout the building just became 48 inches wide without anyone noticing, causing framing clashes throughout the exterior facade.',
          isOptimal: false,
          scoreAwarded: 0
        },
        {
          text: 'Select Window #102, click Edit Type, click "Duplicate", name the new type "Casement - 48x48 Egress", update the Width parameter to 48", and click OK.',
          consequence: 'Flawless execution! Duplicating the Type isolates the change to Window #102 while preserving the geometry and specifications of the other 64 windows.',
          isOptimal: true,
          scoreAwarded: 100
        },
        {
          text: 'Delete the window and draw 2D detail lines in the elevation view showing a 48" window.',
          consequence: 'Fails BIM verification. The 3D model, floor plan, wall opening, and window schedule will now be completely out of sync.',
          isOptimal: false,
          scoreAwarded: 0
        }
      ],
      industryStandardReference: 'Standard BIM authoring protocol mandates duplicating types before adjusting dimensional parameters to prevent unintended global changes.'
    }
  },
  {
    id: 'coordination-openbim',
    number: 4,
    title: 'Clash Coordination, Navisworks & OpenBIM',
    tagline: 'Hard vs soft clashes, Navisworks workflows, BCF issue tracking, IFC schemas, and COBie.',
    readTime: '16 min',
    iconName: 'ShieldAlert',
    color: 'from-violet-500 to-purple-600',
    summary: 'Step onto the front lines of spatial coordination. Understand the distinction between Hard and Soft clashes, master clash matrix prioritization, communicate via BCF, and understand IFC & COBie open standards.',
    sections: [
      {
        id: 'clash-types',
        title: 'Hard Clashes vs. Soft (Clearance) Clashes vs. 4D Clashes',
        subtitle: 'The three types of spatial collisions identified in BIM coordination.',
        content: [
          'Clash detection is the automated geometric inspection of multi-discipline models to identify spatial conflicts before materials are fabricated or assembled on site.',
          '1. Hard Clash: Two physical components intersecting the same physical 3D space. Example: A 16" rectangular HVAC supply duct running straight through the web of a structural W-beam, or a plumbing pipe piercing an elevator shaft.',
          '2. Soft Clash (Clearance / Buffer Clash): An element encroaching into a designated buffer zone required for maintenance access, insulation thickness, thermal expansion, or building code egress. Example: Placing an electrical conduit directly in front of a VAV box access panel, preventing electricians from servicing the motor.',
          '3. 4D / Workflow Clash: A temporal conflict during construction staging. Example: Equipment delivery scheduled for a room after the exterior curtain wall has already been sealed, or scaffolding clashing with mobile crane swing radiuses.'
        ],
        keyTakeaways: [
          'Hard Clash = Physical solid-on-solid intersection.',
          'Soft Clash = Clearance / maintenance / code violation.',
          '4D Clash = Logistics and sequencing conflict over time.'
        ],
        diagramType: 'coordination_matrix',
        proTip: 'In coordination meetings, Soft Clashes are often more dangerous than Hard Clashes. A duct through a beam is obvious; but a valve hidden behind a duct with zero hand clearance won’t be discovered until maintenance operations, costing thousands.'
      },
      {
        id: 'clash-resolution-hierarchy',
        title: 'Who Moves What? The Clash Resolution Hierarchy',
        subtitle: 'The universal pecking order for resolving spatial disputes between trades.',
        content: [
          'When two elements clash, which trade is obligated to re-route their system? The industry uses a strict hierarchy based on physical rigidity and engineering constraints:',
          '1. Primary Structure (Top Priority - Never Move): Columns, core shear walls, major transfer beams, and foundations. These rarely move for services without major structural re-calculation.',
          '2. Gravity-Flow Drainage (Sanitary & Storm Plumbing): Sloped pipes rely on gravity (e.g., 1/4" per foot drop). They cannot be routed up-and-down over beams without causing sewer blockages.',
          '3. Large Mechanical HVAC Ductwork: Large duct mains (e.g., 48" x 24") require significant ceiling plenum space; resizing or offsetting them causes airflow pressure drops and fan noise.',
          '4. Pressurized Pipework: Domestic water, chilled water, heating water, and fire sprinkler lines can offset around obstacles using standard 45° or 90° elbows because water is under pressure.',
          '5. Electrical Conduits & Cable Trays: Conduits and flexible cabling are the most adaptable systems and should typically route around rigid mechanical and structural systems.'
        ],
        keyTakeaways: [
          'Structure > Gravity Drainage > Large HVAC > Pressurized Piping > Electrical/Data Trays.',
          'Never ask a structural engineer to cut a beam flange without reviewing penetration guidelines.',
          'Coordination is about collaboration, not pointing fingers.'
        ]
      },
      {
        id: 'coordination-tools-navisworks',
        title: 'Coordination Engines: Navisworks, Revizto & Solibri',
        subtitle: 'How multi-gigabyte models are aggregated and inspected smoothly.',
        content: [
          'Revit is an authoring tool; it is not designed to open 15 full models simultaneously for clash detection. Teams use specialized coordination engines like Autodesk Navisworks Manage, Revizto, or Solibri Model Checker.',
          'Navisworks File Types (Vital Day 1 Knowledge!):',
          '• .NWC (Navisworks Cache): The lightweight cache generated automatically when a Revit, ArchiCAD, or IFC file is converted into Navisworks format.',
          '• .NWF (Navisworks File Set): Contains NO 3D geometry! It only saves links to the original NWC cache files, plus your clash tests, saved viewpoints, redline markups, and selection sets. This is what you open and save daily.',
          '• .NWD (Navisworks Document): A standalone, complete snapshot containing all compressed geometry, clash tests, and markups baked into one frozen file. Used for sending coordination snapshots to clients or contractors.'
        ],
        keyTakeaways: [
          'NWC = Cache (Geometry export from authoring tool)',
          'NWF = Working File Set (pointers + clash setups + markups)',
          'NWD = Distribution Archive (frozen single-file package)'
        ],
        proTip: 'Always save your daily work in an `.NWF` file set. If you update the Revit model and re-export the `.NWC`, your `.NWF` automatically refreshes the new geometry while keeping all your clash tests and viewpoints intact!'
      },
      {
        id: 'openbim-bcf-ifc',
        title: 'OpenBIM Standards: IFC & BCF',
        subtitle: 'Universal interoperability without software vendor lock-in.',
        content: [
          'OpenBIM is a vendor-neutral approach based on open standards developed by buildingSMART:',
          '• IFC (Industry Foundation Classes): An open, neutral ISO-standard data schema (ISO 16739). It allows an architect using ArchiCAD, a structural engineer using Tekla, and an MEP engineer using Revit to exchange intelligent 3D models seamlessly.',
          '• BCF (BIM Collaboration Format): An open XML/JSON format for communicating issues, clashes, and comments. Instead of emailing a 500MB Revit file to say "move this duct", you send a 5KB BCF snippet. When the recipient opens the BCF in their authoring tool, it flies their camera to the exact coordinates, highlights the clashing element GUID, and displays your instructions.',
          '• COBie (Construction Operations Building Information Exchange): A standardized structured spreadsheet format containing equipment assets, serial numbers, manuals, and warranties for building handover to facility managers.'
        ],
        keyTakeaways: [
          'IFC = Universal neutral 3D model format (OpenBIM geometry + properties).',
          'BCF = Lightweight issue tracking format that points directly to elements via GUIDs.',
          'COBie = Non-proprietary data format for facility operations and asset management.'
        ],
        proTip: 'Firms increasingly use cloud BCF trackers like Revizto, BIM Track/Newforma, or BIMcollab. Knowing how BCF viewpoints sync directly to Revit element GUIDs makes you an instant coordination asset.'
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the primary difference between a "Hard Clash" and a "Soft Clash"?',
        options: [
          'Hard clashes occur in concrete; soft clashes occur in drywall.',
          'A Hard Clash is physical geometric intersection of two elements; a Soft Clash is a violation of clearance, maintenance, or insulation buffer zones.',
          'Hard clashes are resolved in 2D; soft clashes are resolved in 3D.',
          'Soft clashes can always be ignored by the contractor.'
        ],
        correctIndex: 1,
        explanation: 'Hard clashes represent solid physical collisions. Soft/Clearance clashes represent spatial violations where an element encroaches on required maintenance access, fire separation, or code clearances.',
        topicTag: 'Clash Types'
      },
      {
        id: 'q4-2',
        question: 'According to the standard MEP/Structural coordination hierarchy, which system has the highest priority and should almost NEVER be moved for other services?',
        options: [
          'Flexible electrical conduits',
          'Pressurized domestic cold water piping',
          'Primary Structural Framing (concrete columns, transfer beams, shear walls)',
          'Perimeter heating convectors'
        ],
        correctIndex: 2,
        explanation: 'Primary structural members support building integrity and cannot be relocated or compromised for MEP distribution without intensive engineering recalculation.',
        topicTag: 'Coordination Hierarchy'
      },
      {
        id: 'q4-3',
        question: 'In Autodesk Navisworks, which file format acts as a lightweight pointer file that references original geometry links without storing 3D geometry inside itself?',
        options: ['.NWC', '.NWF', '.NWD', '.RVT'],
        correctIndex: 1,
        explanation: '.NWF (Navisworks File Set) stores pointers to linked .NWC cache files along with clash tests, markups, and viewpoints, enabling dynamic model updates.',
        topicTag: 'Navisworks Files'
      },
      {
        id: 'q4-4',
        question: 'How does the BIM Collaboration Format (BCF) streamline clash resolution across different software platforms?',
        options: [
          'It automatically converts all models into AutoCAD 2000 format.',
          'It exchanges lightweight issue snapshots containing camera viewpoints, element GUIDs, and comments without needing to transmit giant 3D models.',
          'It deletes the clashing elements automatically.',
          'It replaces the need for architects on the project.'
        ],
        correctIndex: 1,
        explanation: 'BCF transmits issue metadata, camera viewpoint parameters, and specific element Global Unique Identifiers (GUIDs) so any software can immediately navigate to the exact problem area.',
        topicTag: 'OpenBIM & BCF'
      },
      {
        id: 'q4-5',
        question: 'What is the primary objective of COBie (Construction Operations Building Information Exchange)?',
        options: [
          'To generate artistic photorealistic renderings for marketing brochures.',
          'To deliver structured, non-proprietary equipment and asset data to facility owners for lifecycle operation and maintenance.',
          'To calculate concrete curing times on construction sites.',
          'To replace the need for construction contracts.'
        ],
        correctIndex: 1,
        explanation: 'COBie standardizes the capture and handover of asset data, maintenance manuals, warranties, and equipment schedules to the building owner’s computerized maintenance management system (CMMS).',
        topicTag: 'COBie & Handover'
      }
    ],
    scenario: {
      id: 'sc-4',
      title: 'The Beam Penetration Showdown',
      roleContext: 'In weekly Navisworks clash coordination, a critical clash is flagged: A 24"x18" supply air duct runs straight through a 28" deep structural steel girder over the main lobby ceiling.',
      dilemma: 'The HVAC subcontractor asks the structural engineer: "Can you just cut a 24-inch hole in the middle of your beam web?" How should the BIM Coordinator handle this?',
      options: [
        {
          text: 'Agree immediately and tell the HVAC team to model the hole through the beam flange.',
          consequence: 'Catastrophic! Cutting beam flanges destroys structural bending capacity, risking catastrophic structural failure.',
          isOptimal: false,
          scoreAwarded: 0
        },
        {
          text: 'Investigate if the duct can transition into two smaller rectangular ducts or offset below the beam; if a penetration is unavoidable, coordinate with the structural engineer to check if a reinforced web sleeve within the central 1/3 of the beam span complies with engineering design rules.',
          consequence: 'Superb coordination mastery! You followed engineering reality: protect the structure, consider MEP rerouting/transitions first, and follow structural web penetration criteria if sleeves are permitted.',
          isOptimal: true,
          scoreAwarded: 100
        },
        {
          text: 'Change the duct status to "Approved" in Navisworks and leave it for the field crew to figure out during installation.',
          consequence: 'Worst possible outcome. This causes an emergency job site stoppage, thousands in delay claims, and emergency rework.',
          isOptimal: false,
          scoreAwarded: 0
        }
      ],
      industryStandardReference: 'AISC and standard structural guidelines mandate strict limits on beam web openings (typically central third of depth, away from high shear zones) and require exploring MEP offsets first.'
    }
  }
];

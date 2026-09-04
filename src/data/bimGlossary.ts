import { GlossaryTerm } from '../types';

export const BIM_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'iso-19650',
    term: 'ISO 19650',
    category: 'Standards & Process',
    definition: 'The international series of standards for information management over the lifecycle of a built asset using BIM. Establishes the Common Data Environment (CDE) framework, information delivery milestones, and collaborative workflows.',
    realWorldExample: 'A client requires all folder structures, file naming conventions, and revision codes (e.g. P01, C01) to strictly follow ISO 19650-2 guidelines.',
    interviewTip: 'Mention that you understand the transition from the older British PAS 1192 standard to the global ISO 19650 standard. Highlights high procedural literacy.',
    relatedTerms: ['CDE', 'EIR', 'BEP', 'OIR']
  },
  {
    id: 'cde',
    term: 'Common Data Environment (CDE)',
    acronym: 'CDE',
    category: 'Standards & Process',
    definition: 'The single source of information used to collect, manage, and disseminate all approved project information among multidisciplinary teams through four managed containers: WIP, Shared, Published, and Archive.',
    realWorldExample: 'Using Autodesk Construction Cloud (ACC) or Trimble Connect as the central CDE where architectural, structural, and MEP teams publish and link models weekly.',
    interviewTip: 'Emphasize that you never link to another discipline’s WIP (Work In Progress) model; you only link to models approved and moved into the "Shared" folder.',
    relatedTerms: ['ISO 19650', 'WIP', 'Shared Container', 'Published Container']
  },
  {
    id: 'eir',
    term: 'Exchange Information Requirements',
    acronym: 'EIR',
    category: 'Standards & Process',
    definition: 'A document authored by the appointing party (client/owner) that establishes the specific managerial, commercial, and technical information deliverables required from the supply chain.',
    realWorldExample: 'The hospital client’s EIR specifies that all patient room doors must have fire ratings, acoustic ratings, and hardware schedule IDs embedded in COBie parameters.',
    interviewTip: 'Clearly distinguish EIR (the client’s requirements) from BEP (the design/construction team’s plan to fulfill those requirements).',
    relatedTerms: ['BEP', 'ISO 19650', 'AIR']
  },
  {
    id: 'bep',
    term: 'BIM Execution Plan',
    acronym: 'BEP',
    category: 'Standards & Process',
    definition: 'A comprehensive project governance document prepared by the delivery team defining how the BIM process will be executed, monitored, and delivered. Defines software versions, coordinate origins, worksets, clash tolerances, and deliverables.',
    realWorldExample: 'The BEP specifies that all teams must use Revit 2024.2, link models by Shared Coordinates, and execute bi-weekly Navisworks clash batches with a 0.5" tolerance.',
    interviewTip: 'When asked how you approach a new project, say: "My first action is always to study the project BEP to understand file naming, software versioning, and shared coordinate baselines."',
    relatedTerms: ['EIR', 'Pre-contract BEP', 'Post-contract BEP', 'LOD']
  },
  {
    id: 'lod',
    term: 'Level of Development',
    acronym: 'LOD',
    category: 'Standards & Process',
    definition: 'A standardized scale (LOD 100 to LOD 500) defined by AIA / BIMForum that indicates the degree to which an element’s geometry and associated attribute data can be relied upon by other project participants at specific project phases.',
    realWorldExample: 'During schematic design, columns are modeled at LOD 200 (approximate size/location); at construction document milestone, they must be LOD 350 with connection clearances.',
    interviewTip: 'Emphasize that LOD stands for Level of Development (reliance on geometry + data), NOT just visual Level of Detail.',
    relatedTerms: ['LOIN', 'LOD 300', 'LOD 350', 'LOD 400']
  },
  {
    id: 'loin',
    term: 'Level of Information Need',
    acronym: 'LOIN',
    category: 'Standards & Process',
    definition: 'Under ISO 19650-1, the framework that specifies the precise quality, quantity, and granularity of geometric and alphanumeric information required at each milestone, preventing wasteful "over-modeling".',
    realWorldExample: 'Setting the LOIN for an acoustic ceiling so that only thickness and NRC rating parameters are added, rather than modeling every individual suspension clip.',
    interviewTip: 'Frame LOIN as the lean principle in BIM: only modeling what is necessary for decisions, avoiding model bloat.',
    relatedTerms: ['ISO 19650', 'LOD', 'EIR']
  },
  {
    id: 'central-model',
    term: 'Central Model',
    category: 'Modeling & Software',
    definition: 'The master database file of a workshared project stored on a central server or cloud hub. It tracks all design changes, element permissions, and historical versions contributed by team members.',
    realWorldExample: '`HQ_Tower_Architecture_Central.rvt` hosted in Autodesk Docs, which all architectural modelers synchronize their local files back into.',
    interviewTip: 'Reiterate the cardinal rule: never open the Central Model directly to model elements. Always create a new Local copy.',
    relatedTerms: ['Local Model', 'Worksharing', 'Sync with Central', 'Workset']
  },
  {
    id: 'local-model',
    term: 'Local Model',
    category: 'Modeling & Software',
    definition: 'A working copy of the Central Model created on a user’s local workstation hard drive. The user models within this local file and periodically synchronizes changes back to the Central Model.',
    realWorldExample: '`HQ_Tower_Architecture_Local_RyanP.rvt` stored in the user’s local Documents directory.',
    interviewTip: 'Explain that working in local copies prevents network latency lag and prevents file locking conflicts.',
    relatedTerms: ['Central Model', 'Worksharing', 'Sync with Central']
  },
  {
    id: 'workset',
    term: 'Workset',
    category: 'Modeling & Software',
    definition: 'A discrete collection of building elements in a workshared model. Primarily used to manage user editing permissions, divide large models among teams, and control display performance.',
    realWorldExample: 'Creating worksets for `Shared Levels & Grids`, `Exterior Shell`, `Core Restrooms`, and `Interior Partitions`.',
    interviewTip: 'Warn about the common pitfall: always verify your active workset before placing geometry so you don’t place furniture on the grid workset.',
    relatedTerms: ['Worksharing', 'Element Borrowing', 'Relinquish']
  },
  {
    id: 'sync-with-central',
    term: 'Synchronize with Central (SWC)',
    acronym: 'SWC',
    category: 'Modeling & Software',
    definition: 'The command in Revit that writes all newly created or edited elements from the user’s Local file to the Central Model, downloads changes made by other team members, and relinquishes borrowed element ownership.',
    realWorldExample: 'Pressing Ctrl+Alt+S every 60-90 minutes to ensure your HVAC duct modifications are saved to the server and visible to the structural team.',
    interviewTip: 'Mention best practice: always check "Relinquish Borrowed Elements" upon final daily sync so colleagues aren’t locked out.',
    relatedTerms: ['Central Model', 'Worksets', 'Editing Request']
  },
  {
    id: 'system-family',
    term: 'System Family',
    category: 'Modeling & Software',
    definition: 'A family type predefined within the Revit software environment that cannot be loaded from or exported to an external `.rfa` library file. Composed of layered assemblies.',
    realWorldExample: 'Compound walls (brick + air gap + insulation + gypsum board), concrete floor slabs, roofs, stairs, ducts, and piping.',
    interviewTip: 'Demonstrates understanding that system families are defined by project templates, unlike modular loadable families.',
    relatedTerms: ['Loadable Family', 'In-Place Family', 'Family Type']
  },
  {
    id: 'loadable-family',
    term: 'Loadable (Component) Family',
    category: 'Modeling & Software',
    definition: 'A standalone component created, modified, and saved in an external `.rfa` family file that can be loaded into any Revit project. Includes 2D annotation tags and 3D building components.',
    realWorldExample: 'Doors, windows, lighting fixtures, mechanical air handling units, plumbing water closets, and furniture.',
    interviewTip: 'Highlight that loadable families must be modeled cleanly with parameter flex testing to avoid slowing down project performance.',
    relatedTerms: ['System Family', 'In-Place Family', 'Shared Parameters']
  },
  {
    id: 'in-place-family',
    term: 'In-Place Family',
    category: 'Modeling & Software',
    definition: 'Custom 3D geometry modeled directly within the context of an individual project for unique, one-off situations where standard families cannot conform.',
    realWorldExample: 'A bespoke sculptural reception desk that wraps around an irregular tilted concrete structural column.',
    interviewTip: 'Highlight that junior modelers often overuse in-place families. Emphasize that you know they should be minimized because they bloat model file sizes.',
    relatedTerms: ['Loadable Family', 'System Family']
  },
  {
    id: 'type-parameter',
    term: 'Type Parameter',
    category: 'Modeling & Software',
    definition: 'A parameter property that applies to every single instance of that specific family type across the entire project. Changing a type parameter updates all placed elements of that type.',
    realWorldExample: 'Adjusting the "Fire Rating" of the "Double-Egress Hollow Metal Door" type updates all 42 doors of that type throughout the hospital simultaneously.',
    interviewTip: 'Distinguish clearly: Type changes affect every element of that type; Instance changes affect only the selected element.',
    relatedTerms: ['Instance Parameter', 'Shared Parameter', 'Project Parameter']
  },
  {
    id: 'instance-parameter',
    term: 'Instance Parameter',
    category: 'Modeling & Software',
    definition: 'A parameter property that applies only to an individual placed element, allowing variation between elements of the exact same family type.',
    realWorldExample: 'Setting the unique "Mark" (door number "104B"), "Sill Height Offset", or "Base Constraint" on a single placed window.',
    interviewTip: 'Explain that if you only need to change one window dimension without affecting others, you must either duplicate the type or use an instance parameter.',
    relatedTerms: ['Type Parameter', 'Shared Parameter']
  },
  {
    id: 'shared-parameter',
    term: 'Shared Parameter',
    category: 'Modeling & Software',
    definition: 'A parameter definition stored in an external shared parameter text file that has a unique GUID. Crucial because it can be used simultaneously across families, projects, schedules, and annotation tags.',
    realWorldExample: 'Adding a custom parameter `COBie.Component.AssetIdentifier` to an Air Handling Unit family that can be tagged on an HVAC sheet and scheduled in a facility handover matrix.',
    interviewTip: 'Mention that without Shared Parameters, an annotation tag cannot read or display a custom property created inside a project schedule.',
    relatedTerms: ['Project Parameter', 'Type Parameter', 'COBie']
  },
  {
    id: 'view-template',
    term: 'View Template',
    category: 'Modeling & Software',
    definition: 'A saved collection of view properties (scale, discipline, detail level, visibility/graphic overrides, model display, view range) applied to views to enforce graphic consistency across project sheet sets.',
    realWorldExample: 'Applying the `MEP_Plumbing_FloorPlan_1:100` template to all 12 floor plans so sanitary pipes always appear magenta and architectural walls appear halftone.',
    interviewTip: 'A classic troubleshooting question: "Why is my Visibility/Graphics settings dialog greyed out?" Answer: Because a View Template is controlling it!',
    relatedTerms: ['Visibility/Graphics', 'View Range', 'Discipline']
  },
  {
    id: 'view-range',
    term: 'View Range',
    category: 'Modeling & Software',
    definition: 'A set of horizontal planes (Top, Cut Plane, Bottom, and View Depth) that control the visibility and cut appearance of elements in a plan view.',
    realWorldExample: 'Setting the Cut Plane at 4\'-0" (1200mm) so windows and doors are sliced cleanly, and setting View Depth to show underground drainage lines.',
    interviewTip: 'Mastering View Range is the #1 fix when a beginner complains: "I placed my element but Revit says it is not visible in this view!"',
    relatedTerms: ['View Template', 'Visibility/Graphics']
  },
  {
    id: 'hard-clash',
    term: 'Hard Clash',
    category: 'Coordination & Clashes',
    definition: 'A physical geometric conflict where two or more solid 3D elements intersect and occupy the exact same physical space in the combined model.',
    realWorldExample: 'A 24" round supply duct penetrating through a W14x90 structural steel beam where no beam sleeve has been engineered.',
    interviewTip: 'State that hard clashes are typically identified first in automated clash tests using Navisworks or Revizto with zero or negative tolerance.',
    relatedTerms: ['Soft Clash', 'Clash Matrix', 'Navisworks', 'BCF']
  },
  {
    id: 'soft-clash',
    term: 'Soft Clash (Clearance Clash)',
    category: 'Coordination & Clashes',
    definition: 'A geometric conflict where an element encroaches into a required spatial buffer zone, such as maintenance clearance, thermal insulation thickness, or fire egress access.',
    realWorldExample: 'A sanitary drain pipe running within 12 inches of an electrical switchgear panel, violating local code clearance and maintenance access mandates.',
    interviewTip: 'Emphasize that soft clashes are often more expensive to fix during building operation than hard clashes because maintenance technicians cannot access equipment.',
    relatedTerms: ['Hard Clash', 'Clash Matrix', 'Tolerance']
  },
  {
    id: 'clash-matrix',
    term: 'Clash Matrix',
    category: 'Coordination & Clashes',
    definition: 'A project planning grid established in the BEP defining which model disciplines will be tested against each other, the order of coordination runs, and the geometric tolerance thresholds.',
    realWorldExample: 'A matrix stating: "Batch 1: Primary Steel vs Large Ductwork (Tolerance: 0.5 inches); Batch 2: Gravity Drainage vs Architectural Ceilings."',
    interviewTip: 'Explain that you never test "all elements against all elements" on day one because it creates 50,000 false-positive clashes. You test high-priority matrices sequentially.',
    relatedTerms: ['Hard Clash', 'Navisworks', 'BEP']
  },
  {
    id: 'navisworks',
    term: 'Autodesk Navisworks',
    category: 'Coordination & Clashes',
    definition: 'A project review software used by BIM coordinators for aggregating multi-format 3D models, running automated clash detection batches, generating 4D construction simulations, and producing viewpoints.',
    realWorldExample: 'Aggregating Revit architectural, Tekla structural, and fabrication MEP files to run weekly trade coordination clash reports.',
    interviewTip: 'Demonstrate that you know the three file extensions: .NWC (cache), .NWF (working file set with clash tests), and .NWD (frozen distribution deliverable).',
    relatedTerms: ['.NWC', '.NWF', '.NWD', 'Clash Detective', 'TimeLiner']
  },
  {
    id: 'bcf',
    term: 'BIM Collaboration Format',
    acronym: 'BCF',
    category: 'Data & Formats',
    definition: 'An open, vendor-neutral XML/JSON standard created by buildingSMART for communicating model issues, clashes, and RFIs using lightweight camera viewpoints and element GUIDs without sharing full model files.',
    realWorldExample: 'A BIM coordinator flags a clash in Navisworks, creates a BCF topic assigned to the MEP engineer; the MEP engineer clicks the BCF link in Revit and their screen immediately zooms to the exact pipe and beam.',
    interviewTip: 'Describe BCF as "the issue tracking communication layer of OpenBIM that eliminates huge file transfers and ambiguous email screenshots."',
    relatedTerms: ['OpenBIM', 'IFC', 'GUID', 'Revizto']
  },
  {
    id: 'ifc',
    term: 'Industry Foundation Classes',
    acronym: 'IFC',
    category: 'Data & Formats',
    definition: 'An open, vendor-neutral, ISO-standardized (ISO 16739) object-based data model schema for exchanging BIM data between disparate software applications without loss of geometry or properties.',
    realWorldExample: 'Exporting an architectural model from ArchiCAD as an `IFC4 Design Transfer View` so the MEP consultant can link it into Autodesk Revit.',
    interviewTip: 'Highlight the distinction between IFC versions (IFC2x3 Coordination View 2.0 vs the newer IFC4 Reference View).',
    relatedTerms: ['OpenBIM', 'buildingSMART', 'BCF', 'COBie']
  },
  {
    id: 'cobie',
    term: 'COBie',
    acronym: 'COBie',
    category: 'Data & Formats',
    definition: 'Construction Operations Building Information Exchange. A standardized data schema (delivered as structured spreadsheets or IFC STEP files) capturing asset data, equipment serial numbers, maintenance schedules, and warranties for facility managers.',
    realWorldExample: 'Delivering an Excel-formatted COBie deliverable at building handover containing every mechanical pump, boiler, and air terminal for upload into the owner’s Maximo CMMS software.',
    interviewTip: 'Connect COBie to 7D BIM: it is the vehicle through which design and construction data transfers into facility maintenance operations.',
    relatedTerms: ['7D BIM', 'Asset Information Model', 'IFC']
  },
  {
    id: 'guid',
    term: 'Global Unique Identifier',
    acronym: 'GUID',
    category: 'Data & Formats',
    definition: 'A unique 128-bit hexadecimal identifier automatically assigned to every single element created in a BIM model. Ensures that elements can be uniquely identified and tracked across software exports (IFC, BCF, Navisworks).',
    realWorldExample: 'An element GUID like `2O2$U$pointy8734h` persists through an IFC export, allowing a clash report generated in Solibri to find the exact duct in Revit.',
    interviewTip: 'Explain that Revit element IDs can change upon file recreation or central detachment, but IFC GUIDs are designed for permanent cross-software tracking.',
    relatedTerms: ['IFC', 'BCF', 'Shared Parameter']
  },
  {
    id: 'scan-to-bim',
    term: 'Scan-to-BIM (Point Cloud)',
    category: 'Modeling & Software',
    definition: 'The process of capturing real-world physical spaces using 3D laser scanning or LiDAR (producing millions of spatial points called a Point Cloud), and importing that data into BIM software to model accurate as-built conditions.',
    realWorldExample: 'Laser scanning a 1920s historical bank building to generate a point cloud `.rcp` file, then tracing existing columns and load-bearing masonry walls in Revit.',
    interviewTip: 'Mention that point clouds are high-accuracy references that reveal floor deflections and out-of-plumb walls before renovation modeling begins.',
    relatedTerms: ['LOD 500', 'As-Built', 'Photogrammetry']
  }
];

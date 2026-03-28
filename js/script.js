/* =============================================================================
   PORTFOLIO — SCRIPT.JS
   =============================================================================
   
   Ce fichier contient :
   1. PORTFOLIO_DATA  → la liste de tes contenus (images, vidéos, légendes)
   2. buildGrid()     → construit la grille d'images ET la grille de légendes
   3. Scroll sync     → synchronise le défilement des deux panneaux
   
   ============================================================================= */


/* =============================================================================
   1. DONNÉES DU PORTFOLIO
   =============================================================================
   
   C'est ici que tu ajoutes, modifies ou supprimes tes contenus.
   Les items s'affichent de gauche à droite, de haut en bas.
   Quand un item ne rentre plus sur la ligne, il passe à la suivante.
   
   CHAQUE ITEM A 4 PROPRIÉTÉS :
   
   ┌──────────┬────────────────────────────────────────────────────────┐
   │ type     │ "image" ou "video"                                    │
   ├──────────┼────────────────────────────────────────────────────────┤
   │ src      │ Chemin vers ton fichier.                               │
   │          │ Ex: "assets/images/photo1.jpg"                        │
   │          │ Ex: "assets/videos/clip1.mp4"                         │
   │          │ Laisse "" pour afficher un placeholder gris.          │
   ├──────────┼────────────────────────────────────────────────────────┤
   │ caption  │ La légende affichée dans le panneau du bas.           │
   │          │ Ex: "Sans titre, 2024"                                │
   ├──────────┼────────────────────────────────────────────────────────┤
   │ ratio    │ Le ratio d'aspect de ton image/vidéo.                 │
   │          │ Valeurs possibles : "4:5", "2:3", "9:16", "16:9"     │
   │          │                                                        │
   │          │   "16:9"  → paysage large    ████████████              │
   │          │   "4:5"   → portrait léger   ████                      │
   │          │   "2:3"   → portrait          ███                      │
   │          │   "9:16"  → portrait étroit   ██                       │
   └──────────┴────────────────────────────────────────────────────────┘
   
   POUR AJOUTER UN ITEM :
   Copie-colle une ligne et modifie les valeurs :
   { type: "image", src: "assets/images/monimage.jpg", caption: "Ma légende", ratio: "16:9" },
   
   POUR SUPPRIMER UN ITEM :
   Supprime la ligne entière (avec la virgule).
   
   POUR RÉORDONNER :
   Coupe-colle les lignes dans l'ordre souhaité.
   
   ============================================================================= */

function parseRatio(r) {
    const [w, h] = r.split(':').map(Number);
    return w / h;
}

const PORTFOLIO_DATA = [

    // ─── Tes contenus ici ─────────────────────────────────────────────
    // Supprime les exemples ci-dessous et remplace par tes propres items.

    { type: "image", src: "assets/images/Etudes/N28/DSC05873.jpg", caption: "Études Studio No.28, Lookbook FW26 Runway, Art Direction Support & Post-Production Coordination, 2026, 1/4", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N28/DSC05617.jpg", caption: "Études Studio No.28, Lookbook FW26 Runway, Art Direction Support & Post-Production Coordination, 2026, 2/4", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N28/DSC07142.jpg", caption: "Études Studio No.28, Lookbook FW26 Runway, Art Direction Support & Post-Production Coordination, 2026, 3/4", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N28/DSC06135.jpg", caption: "Études Studio No.28, Lookbook FW26 Runway, Art Direction Support & Post-Production Coordination, 2026, 4/4", ratio: "2:3" },
    { type: "vimeo", src: "1177344274", caption: "Études Studio No.28, FW26 Runway, Editing, 2026, 1/3", ratio: "4:5" },
    { type: "vimeo", src: "1177344546", caption: "Études Studio No.28, FW26 Runway, Editing, 2026, 2/3", ratio: "4:5" },
    { type: "vimeo", src: "1177344788", caption: "Études Studio No.28, FW26 Runway, Editing, 2026, 3/3", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N28/Found_Tape_Fixe_01.jpg", caption: "Études Studio No.28, FW26 Runway Teaser, Shooting & Editing, 2026, 1/2", ratio: "4:5" },
    { type: "vimeo", src: "1177742973", caption: "Études Studio No.28, FW26 Runway Teaser, Shooting & Editing, 2026, 2/2", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N28/E_NO28_SHOW_STD.jpg", caption: "Études Studio No.28, FW26 Runway Invite, Graphic Design, 2026, 1/2", ratio: "32:23" },
    { type: "image", src: "assets/images/Etudes/N28/E_NO28_WHOLESALE_SHOWROOM_STD_02.jpg", caption: "Études Studio No.28, FW26 Runway Invite, Graphic Design, 2026, 2/2", ratio: "32:23" },
    { type: "image", src: "assets/images/Etudes/N28/OPM_ETUDES-V01-10.jpg", caption: "Études Studio No.28, FW26 Showroom Shooting, Shooting Coordination, 2026, 1/3", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N28/OPM_ETUDES-V01-09.jpg", caption: "Études Studio No.28, FW26 Showroom Shooting, Shooting Coordination, 2026, 2/3", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N28/OPM_ETUDES-V01-11.jpg", caption: "Études Studio No.28, FW26 Showroom Shooting, Shooting Coordination, 2026, 3/3", ratio: "2:3" },
   
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look06.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look12.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look15.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look22.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look27.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N27/Etudes Studio_SS26_runway_IG_look34.jpg", caption: "Études Studio No.27, SS26 Runway, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "vimeo", src: "1177743432", caption: "Études Studio No.27, SS26 Runway Teaser, Shooting & Editing, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177743986", caption: "Études Studio No.27, SS26 Runway Teaser, Shooting & Editing, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177743765", caption: "Études Studio No.27, SS26 Runway Teaser, Shooting & Editing, 2025", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N27/E_STRUCTURE_OF_FEELING_FIXE_SELEC_PAGE_05.jpg", caption: "Études Studio No.27, SS26 Collection, Shooting, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177809504", caption: "Études Studio No.27, SS26 Runway Content, Art Direction Support & Post-Production Coordination, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177809654", caption: "Études Studio No.27, SS26 Runway Content, Art Direction Support & Post-Production Coordination, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177343455", caption: "Études Studio No.27, SS26 Runway Content, Art Direction Support & Post-Production Coordination, 2025", ratio: "9:16" },
   
    { type: "image", src: "assets/images/Etudes/N26/ETUDES_STUDIO_LOOKBOOK_PFW_AW2025_1.jpg", caption: "Études Studio No.26, FW25 Lookbook, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/ETUDES_STUDIO_LOOKBOOK_PFW_AW2025_3.jpg", caption: "Études Studio No.26, FW25 Lookbook, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/ETUDES_STUDIO_LOOKBOOK_PFW_AW2025_11.jpg", caption: "Études Studio No.26, FW25 Lookbook, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/ETUDES_STUDIO_LOOKBOOK_PFW_AW2025_24.jpg", caption: "Études Studio No.26, FW25 Lookbook, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/Photos_JMY_2025_ETUDES_No26_IMP_A_003-2.jpg", caption: "Études Studio No.26, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/Photos_JMY_2025_ETUDES_No26_IMP_A_005-2.jpg", caption: "Études Studio No.26, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/Photos_JMY_2025_ETUDES_No26_IMP_A_004-2.jpg", caption: "Études Studio No.26, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/Photos_JMY_2025_ETUDES_No26_IMP_A_007-2.jpg", caption: "Études Studio No.26, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/20250523 Etudes FW25 EDITO0005.jpg", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N26/20250523 Etudes FW25 EDITO0102 1.jpg", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "vimeo", src: "1177810476", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Editing, 2025", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N26/20250523 Etudes FW25 EDITO0600.jpg", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "vimeo", src: "1177341302", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Editing, 2025", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N26/20250523 Etudes FW25 EDITO0602 1.jpg", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "vimeo", src: "1177810970", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Editing, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177811224", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177811336", caption: "Études Studio No.26, FW25 Editorial Content, Art Direction & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/Etudes_Studio_Soundcloud_Peinture_Fraiche_4x5.jpg", caption: "Études Studio No.26, FW25 É-Mix, Photography & Graphic Design, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/250618000065810015_V3_4x5.jpg", caption: "FREITAG + Études Studio, Editorial Shooting, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/250618000065810022_V3_4x5.jpg", caption: "FREITAG + Études Studio, Editorial Shooting, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/250618000065900013_V3_4x5.jpg", caption: "FREITAG + Études Studio, Editorial Shooting, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/250618000065860031_V3_4x5.jpg", caption: "FREITAG + Études Studio, Editorial Shooting, Art Direction Support & Post-Production Coordination, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COLLAB_FREITAG_EVENT_STD.jpg", caption: "FREITAG + Études Studio, Launch Party Invite, Graphic Design, 2025", ratio: "32:23" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_01.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_06.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_04.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" }, 
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_05.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_09.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N26/E_NO26_COMMUNICATION_COLLAB_FREITAG_10.jpg", caption: "FREITAG + Études Studio, Factory Shooting, Photography, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177341845", caption: "FREITAG + Études Studio, Factory Shooting, Art Direction & Post-Production Coordination, 2025", ratio: "9:16" }, 
    { type: "vimeo", src: "1177342370", caption: "FREITAG + Études Studio, Factory Shooting, Art Direction & Post-Production Coordination, 2025", ratio: "9:16" },
    
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_INTRO.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_03.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_03.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_06.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_06.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_07.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_07.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_08.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_08.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_10.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_10.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },

    { type: "image", src: "assets/images/Etudes/N25/KL 9_1996.jpg", caption: "Études Studio No.25, SS25 Editorial Content, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N25/W KL8_3253_RETOUCHE.jpg", caption: "Études Studio No.25, SS25 Editorial Content, Art Direction Support & Post-Production Coordination, 2025", ratio: "2:3" },
    { type: "vimeo", src: "1177811646", caption: "Études Studio No.25, SS25 Content Creation, Editing, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/POST_IG_NEW_EUROPA_02.jpg", caption: "Études Studio No.25, SS25 Content Creation, Photography, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177811950", caption: "Études Studio No.25, SS25 Content Creation, Video Capture & Editing, 2025", ratio: "9:16" }, 
    { type: "vimeo", src: "1177812100", caption: "Études Studio No.25, SS25 Content Creation, Video Capture & Editing, 2025", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N25/STORIES_IG_NEW_EUROPA_03.jpg", caption: "Études Studio No.25, SS25 Content Creation, Photography, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177812335", caption: "Études Studio No.25, SS25 Content Creation, Video Capture & Editing, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177812545", caption: "Études Studio No.25, SS25 Presentation Teaser, Motion Design, 2025", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N25/E_NO25_PAID_CAPS_4x5_0.jpg", caption: "Études Studio No.25, SS25 Content Creation, Scans, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/E_NO25_PAID_CAPS_4x5_03.jpg", caption: "Études Studio No.25, SS25 Content Creation, Scans, 2025", ratio: "4:5" }, 
    { type: "image", src: "assets/images/Etudes/N25/E_NO25_PAID_CAPS_4x5_04.jpg", caption: "Études Studio No.25, SS25 Content Creation, Scans, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/E_NO25_PAID_CAPS_4x5_07.jpg", caption: "Études Studio No.25, SS25 Content Creation, Scans, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177339876", caption: "Thomas Mailaender + Études Studio, Studio Visit, Video Capture & Editing, 2024", ratio: "4:5" },
    { type: "vimeo", src: "1177813306", caption: "Thomas Mailaender + Études Studio, Custom Stamp, Video Capture & Editing, 2024", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N25/POLAROID_POST_ARTWORKS_01.jpg", caption: "Andy Warhol + Études Studio, SS25 Collaboration, Layout, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/Photos_JMY_2025_ETUDESSTUDIOxWARHOL_WEB-HD_B_001.jpeg", caption: "Andy Warhol + Études Studio, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/Photos_JMY_2025_ETUDESSTUDIOxWARHOL_WEB-HD_B_004.jpeg", caption: "Andy Warhol + Études Studio, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N25/Photos_JMY_2025_ETUDESSTUDIOxWARHOL_WEB-HD_B_002.jpeg", caption: "Andy Warhol + Études Studio, Store Visual Merchandising, Art Direction, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177813674", caption: "Andy Warhol + Études Studio, SS25 Collaboration, Motion Design, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177339464", caption: "Andy Warhol + Études Studio, SS25 Collaboration Teaser, Editing, 2025", ratio: "32:23" },  
      
    { type: "image", src: "assets/images/Etudes/N24/H24MMOUT540-64_HOODIE DENIM JACKET TAN_3.jpg", caption: "Études Studio No.24, FW24 Editorial Content, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N24/KEY LOOK 12 Canal Street_5157.jpg", caption: "Études Studio No.24, FW24 Editorial Content, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "vimeo", src: "1177815573", caption: "Études Studio No.24, FW24 Editorial Content, Art Direction & Stop Motion, 2024", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N24/PHOTO_STICKERS.jpg", caption: "Études Studio No.24, FW24 Editorial Content, Art Direction & Photography, 2024", ratio: "4:5" },
    { type: "vimeo", src: "1177814138", caption: "Études Studio No.24, FW24 Editorial Content, Art Direction & Editing, 2024", ratio: "9:16" },
    { type: "image", src: "assets/images/Etudes/N24/etudes_tk_09.jpg", caption: "The Kitchen + Études Studio, Collaboration Editorial, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N24/etudes_tk_028.jpg", caption: "The Kitchen + Études Studio, Collaboration Editorial, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N24/etudes_tk_022.jpg", caption: "The Kitchen + Études Studio, Collaboration Editorial, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "image", src: "assets/images/Etudes/N24/etudes_tk_34_couleur.jpg", caption: "The Kitchen + Études Studio, Collaboration Editorial, Art Direction Support & Post-Production Coordination, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/N24/etudes_tk_038.jpg", caption: "The Kitchen + Études Studio, Collaboration Editorial, Art Direction Support & Post-Production Coordination, 2024", ratio: "2:3" },
    { type: "vimeo", src: "1177816407", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },
    { type: "vimeo", src: "1177816734", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },
    { type: "vimeo", src: "1177816862", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },    
    { type: "image", src: "assets/images/Etudes/N24/TEASER_TK+E_V3_00512.jpg", caption: "The Kitchen + Études Studio, Collaboration Teaser, Layout, 2024", ratio: "9:16" },
    { type: "vimeo", src: "1177335749", caption: "The Kitchen + Études Studio, Collaboration Teaser, Motion Design & Editing, 2024", ratio: "9:16" },    
    { type: "vimeo", src: "1177817142", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },    
    { type: "vimeo", src: "1177817249", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },    
    { type: "vimeo", src: "1177817394", caption: "The Kitchen + Études Studio, Collaboration Editorial, Video Capture & Editing, 2024", ratio: "9:16" },

    { type: "vimeo", src: "1177817680", caption: "Études Studio, Gift with Purchase, Stop Motion, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/Etudes/AUTRES/COMPO_02.jpg", caption: "Études Studio, Gift with Purchase, Photography, 2025", ratio: "4:5" },
    { type: "vimeo", src: "1177333035", caption: "Études Studio, New Visual Identity Campaign, Video Capture & Editing, 2025", ratio: "9:16" },
    { type: "vimeo", src: "1177819751", caption: "Études Studio, Sale Campaign #1, Art Direction & Motion Design, 2024", ratio: "9:16" },
    { type: "vimeo", src: "1177819925", caption: "Études Studio, Sale Campaign #2, Art Direction & Editing, 2024", ratio: "4:5" },
    { type: "vimeo", src: "1177820031", caption: "Études Studio, Sale Campaign #3, Art Direction, 2024", ratio: "4:5" },
    { type: "vimeo", src: "1177334414", caption: "Études Studio, Year Recap, Editing, 2024", ratio: "9:16" },
    
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_12.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_12.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_13.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_13.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_18.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_18.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_24.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_24.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_29.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/PICKS/NOVEMBRE_PICKS_OUTRO_29.mp4", caption: "Novembre Picks, Weekly Art Curation, Graphic & Motion Design, 2025", ratio: "9:16" },

    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_INVITATION_ANIMATION_V5.mp4", caption: "Novembre Magazine 17, Teaser, Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/CONTRIBUTEURS_9x16_V4.mp4", caption: "Novembre Magazine 17, Contributors, Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_BRITTA_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #1, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_CARSON_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #2, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_DRAG_SYNDROM_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #3, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_EMILY_LIPSON_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #4, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_GAZA_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #5, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_HERFRAY_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #6, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_JSPYROU_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #7, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_KIKO_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #8, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_MARCK_LECKEY_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #9, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_MUFE_VDEF_SOUND.mp4", caption: "Novembre Magazine 17, Cover #10, Motion Design, 2025", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/NOVEMBRE_17_DIGITAL_COVER_SCROLL.mp4", caption: "Novembre Magazine 17, Covers, Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Novembre/16_K8_1.mp4", caption: "Novembre Magazine 16, Cover #1, Motion Design, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/16_NATASHA_4.mp4", caption: "Novembre Magazine 16, Cover #2, Motion Design, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/16_NICOLAS_JENN_3.mp4", caption: "Novembre Magazine 16, Cover #3, Motion Design, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/16_Novembre_Cover_Meriem_2.0_4x5.mp4", caption: "Novembre Magazine 16, Cover #4, Motion Design, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/Novembre/16_PETRA.mp4", caption: "Novembre Magazine 16, Cover #5, Motion Design, 2024", ratio: "4:5" },

    { type: "vimeo", src: "1177322565", caption: "Chris Lake – Chemistry (album), 'Falling' Lyrics Video, Editing & Motion Design, 2025", ratio: "16:9" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_01_FALLING_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Falling' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_02_ROUND_AFTER_ROUND_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Round After Round' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_04_CHEMISTRY_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Chemistry' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_06_ON_AND_ON_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'On & On' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_07_REACH_FOR_YOU_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Reach For You' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_08_FAVORITE_ONE_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Favourite One' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_08_JUNGLE_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Jungle' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_09_MEMORIES_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Memories' Visualizer, Editing, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Chris_Lake/CHRIS_LAKE_VISUALIZER_09_WATCH_THE_SUNRISE_IG_9x16.mp4", caption: "Chris Lake – Chemistry (album), 'Watch The Sunrise' Visualizer, Editing, 2025", ratio: "9:16" },

    { type: "video", src: "assets/videos/Asics_Tetier/Asics_Tetier_3couleurs_A.mp4", caption: "Asics × Tétier 2, Editing & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Asics_Tetier/Asics_Tetier_Rose.mp4", caption: "Asics × Tétier 2, Editing & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Asics_Tetier/Asics_Tetier_Vert.mp4", caption: "Asics × Tétier 2, Editing & Motion Design, 2025", ratio: "9:16" },
    { type: "video", src: "assets/videos/Asics_Tetier/Asics_Tetier_Violet.mp4", caption: "Asics × Tétier 2, Editing & Motion Design, 2025", ratio: "9:16" },

    { type: "video", src: "assets/videos/Gaza/VFINALE_9-16.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },
    { type: "video", src: "assets/videos/Gaza/voicesforgza-20240401_170106-289309318.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },
    { type: "video", src: "assets/videos/Gaza/voicesforgza-20240327_065606-3747042242.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },
    { type: "video", src: "assets/videos/Gaza/voicesforgza-20240325_071245-1797594947.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },
    { type: "video", src: "assets/videos/Gaza/AQMg0uihlgOvl9OevBx5-EQ9133SjlJV-0MgljhI3vQ1mSYIAqv_2abNvHWLhKpq0IcqB0l4doqOeCFmXdeIoUu_W89pbumClnYa6wY.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },
    { type: "video", src: "assets/videos/Gaza/voicesforgza-20240329_065112-2547545649.mp4", caption: "Voices For Gaza, Graphic Design & Motion Design, 2024", ratio: "9:16" },

    { type: "image", src: "assets/images/JPG/TG1/07_TG1_PLACEMENT_LOGO_V2_DIGITAL100.jpg", caption: "Jean Paul Gaultier, Très Gaultier Collection, Graphic Design, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TG1/10_TG1_PLACEMENT_LOGO_V2_DIGITAL23.jpg", caption: "Jean Paul Gaultier, Très Gaultier Collection, Graphic Design, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TG1/14_TG1_PLACEMENT_LOGO_V2_DIGITAL62.jpg", caption: "Jean Paul Gaultier, Très Gaultier Collection, Graphic Design, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TG1/21_TG1_PLACEMENT_LOGO_V2_DIGITAL32.jpg", caption: "Jean Paul Gaultier, Très Gaultier Collection, Graphic Design, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TG1/250324_MOCK-UP_FACADE_TG1.jpg", caption: "Jean Paul Gaultier, Window Stickers, Mock-up & Production Files, 2024", ratio: "16:9" },
    { type: "video", src: "assets/videos/JPG/TG1/TG1_COMING_SOON.mp4", caption: "Très Gaultier Collection", ratio: "1:1" },
    { type: "video", src: "assets/videos/JPG/TG1/ANIMATION_TG1.mp4", caption: "Jean Paul Gaultier, Showroom Book, Layout, 2024", ratio: "16:9" },

    { type: "image", src: "assets/images/JPG/HC_SR/240117_JPG Simone Rocha313679.jpg", caption: "JPG Haute Couture by Simone Rocha, Jewellery Shooting, Art Direction Support, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/HC_SR/240117_JPG Simone Rocha313745 1.jpg", caption: "JPG Haute Couture by Simone Rocha, Jewellery Shooting, Art Direction Support, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/HC_SR/240117_JPG Simone Rocha313923.jpg", caption: "JPG Haute Couture by Simone Rocha, Jewellery Shooting, Art Direction Support, 2024", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/HC_SR/240117_JPG Simone Rocha314074.jpg", caption: "JPG Haute Couture by Simone Rocha, Jewellery Shooting, Art Direction Support, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/JPG/HC_SR/363536506_915795633070904_1782677170553564042_n.mp4", caption: "JPG Haute Couture by Simone Rocha, Video Teaser, Editing, 2024", ratio: "4:5" },
    { type: "video", src: "assets/videos/JPG/HC_SR/421715253_728438495918839_8214160170494251073_n.mp4", caption: "JPG Haute Couture by Simone Rocha, Video Teaser, Editing, 2024", ratio: "9:16" },
    
    { type: "video", src: "assets/videos/JPG/HC_OR/IMG_7093.mp4", caption: "JPG Haute Couture by Olivier Rousteing, Teaser Poster, Graphic Design, 2023", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/HC_OR/JPGxOR_CROQUIS_2.jpg", caption: "JPG Haute Couture by Olivier Rousteing, Risography, Production Files, 2023", ratio: "9:16" },
    { type: "video", src: "assets/videos/JPG/HC_OR/JPGxOR_CROQUIS_3.mp4", caption: "JPG Haute Couture by Olivier Rousteing, Risography, Production Files, 2023", ratio: "4:5" },

    { type: "video", src: "assets/videos/JPG/TATTOO/STORY_LAUNCH_TATTOO 2.mp4", caption: "Jean Paul Gaultier, Tattoo Collection Teaser, Graphic & Motion Design, 2023", ratio: "9:16" },
    { type: "video", src: "assets/videos/JPG/TATTOO/STORY_LAUNCH_TATTOO_0610.mp4", caption: "Jean Paul Gaultier, Tattoo Collection Teaser, Graphic & Motion Design, 2023", ratio: "9:16" },
    { type: "video", src: "assets/videos/JPG/TATTOO/STORY_LAUNCH_TATTOO.mp4", caption: "Jean Paul Gaultier, Tattoo Collection Teaser, Graphic & Motion Design, 2023", ratio: "9:16" },
    { type: "image", src: "assets/images/JPG/TATTOO/01_JPG_TATTOO_CAMPAIGN_4x5_LOGO.jpg", caption: "Jean Paul Gaultier, Tattoo Collection Campaign, Graphic Design, 2023", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TATTOO/02_JPG_TATTOO_CAMPAIGN_4x5_AVEC_LOGO_CENSORED.jpg", caption: "Jean Paul Gaultier, Tattoo Collection Campaign, Graphic Design, 2023", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TATTOO/10_JPG_TATTOO_CAMPAIGN_4x5_AVEC_LOGO.jpg", caption: "Jean Paul Gaultier, Tattoo Collection Campaign, Graphic Design, 2023", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/TATTOO/160323_MOCK-UP_FACADE_TATTOO_V2.jpg", caption: "Jean Paul Gaultier, Window Stickers, Mock-up & Production Files, 2023", ratio: "16:9" },
    { type: "video", src: "assets/videos/JPG/TATTOO/JPG_TATTOO_STICKERS_HQ.mp4", caption: "Jean Paul Gaultier, Window Stickers, Video Capture & Editing, 2023", ratio: "9:16" },

    { type: "image", src: "assets/images/JPG/MUSEE/IMG_4642.jpg", caption: "Jean Paul Gaultier, Le Musée Collection, Background Image Making, 2022", ratio: "2:3" },
    { type: "image", src: "assets/images/JPG/MUSEE/IMAGE_05_FRAGILE_MICHELANGE_CLEO_45.jpg", caption: "Jean Paul Gaultier, Le Musée Campaign, Background Image Making & Graphic Design, 2022", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/MUSEE/IMAGE_06_MICHELANGE_VIOLA_45.jpg", caption: "Jean Paul Gaultier, Le Musée Campaign, Background Image Making & Graphic Design, 2022", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/MUSEE/IMAGE_08_MICHELANGE_VIOLA_FULL_45.jpg", caption: "Jean Paul Gaultier, Le Musée Campaign, Background Image Making & Graphic Design, 2022", ratio: "4:5" },
    { type: "image", src: "assets/images/JPG/MUSEE/IMAGE_07_MICHELANGE_RUBENS_CLEO_VIOLA_45.jpg", caption: "Jean Paul Gaultier, Le Musée Campaign, Background Image Making & Graphic Design, 2022", ratio: "4:5" },

    { type: "image", src: "assets/images/JPG/PRIDE/COVER_PRIDE.jpg", caption: "Jean Paul Gaultier, Pride T-Shirt, Graphic Design, 2022", ratio: "16:9" },
    { type: "image", src: "assets/images/JPG/PRIDE/2206-U-TS052B-J013_3.jpg", caption: "Jean Paul Gaultier, Pride T-Shirt, Graphic Design, 2022", ratio: "2:3" },
    { type: "image", src: "assets/images/JPG/PRIDE/2206-U-TS052B-J013_4.jpg", caption: "Jean Paul Gaultier, Pride T-Shirt, Graphic Design, 2022", ratio: "2:3" },

    { type: "video", src: "assets/videos/JPG/ICHN4358.MP4", caption: "JPG × Novembre × Ecal, Motion Design, 2022 ", ratio: "4:5" },

    { type: "image", src: "assets/images/JPG/BRATZ/BRATZ_3880x5773_2.webp", caption: "Jean Paul Gaultier × Bratz, 2O25", ratio: "16:9" },
    { type: "image", src: "assets/images/JPG/BRATZ/MAGAZINE copie.jpg", caption: "Jean Paul Gaultier × Bratz, Early Research, 2O24", ratio: "2:3" },
    { type: "image", src: "assets/images/JPG/BRATZ/RUNWAY_ACCESS.jpg", caption: "Jean Paul Gaultier × Bratz, Early Research, 2O24", ratio: "2:3" },
    { type: "image", src: "assets/images/JPG/BRATZ/SHOOTING.jpg", caption: "Jean Paul Gaultier × Bratz, Early Research, 2O24", ratio: "2:3" },

    { type: "video", src: "assets/videos/JPG/BVSL8221.MP4", caption: "Jean Paul Gaultier, Sidaction Campaign, Editing, 2023", ratio: "4:5" },

    { type: "video", src: "assets/videos/TOZY/Tozy_Animation_Post.mp4", caption: "Corinne Tozy, Visual Identity, made with LCL, 2025", ratio: "16:9" },
    { type: "image", src: "assets/images/TOZY/Tozy_PP_Instagram_TALENTS.jpeg", caption: "Corinne Tozy, Visual Identity, made with LCL, 2025", ratio: "16:9" },
    { type: "image", src: "assets/images/TOZY/Tozy_Animation_Post_Cover.jpg", caption: "Corinne Tozy, Visual Identity, made with LCL, 2025", ratio: "16:9" },

    { type: "image", src: "assets/images/VC/IMG_5873.jpg", caption: "Vila Camélia, Visual Identity, 2022", ratio: "4:5" },

    { type: "image", src: "assets/images/LCL/l.c.l.studio-20230705_173606-202436337.jpg", caption: "Ensad Nancy, Open Doors Visual Identity, Graphic Design, 2025", ratio: "1:1" },    
    { type: "image", src: "assets/images/LCL/60x80_JPO_Ensad2022_02.jpg", caption: "Ensad Nancy, Open Doors Visual Identity, Graphic Design, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/LCL/358520752_2890833897716967_6348542896699754589_n.jpg", caption: "Ensad Nancy, Open Doors Visual Identity, Graphic Design, made with LCL, 2025", ratio: "16:9" },
    { type: "video", src: "assets/videos/LCL/GERrhxUUPsoLShUZAAlTK1msfuljbkYLAAAF.mp4", caption: "Ensad Nancy, Open Doors Visual Identity, Motion Design, made with LCL, 2025", ratio: "1:1" },
    { type: "video", src: "assets/videos/LCL/GLfRixWCa_lvs-cAAJAGOENJumBWbkYLAAAF.mp4", caption: "Ensad Nancy, Open Doors Visual Identity, Motion Design, made with LCL, 2025", ratio: "1:1" },

    { type: "image", src: "assets/images/LCL/417882509_3586833191564720_1318381436124327_n.jpg", caption: "Ensad Nancy, La Dépense, Book Design & Offset Optimization, made with LCL, 2025", ratio: "4:5" },
    { type: "image", src: "assets/images/LCL/417439222_737716301276203_8436803589948453836_n.jpg", caption: "Ensad Nancy, La Dépense, Book Design & Offset Optimization, made with LCL, 2025", ratio: "4:5" },

    { type: "image", src: "assets/images/MACULES/sans-titre-6672.jpg", caption: "Ensad Nancy, Offset Optimization Guide, Book Design & Offset Optimization, 2025", ratio: "16:9" },
    { type: "image", src: "assets/images/MACULES/Numeriser 15.jpg", caption: "Ensad Nancy, Offset Optimization Guide, Book Design & Offset Optimization, made with LCL, 2025", ratio: "2:3" },
    { type: "image", src: "assets/images/MACULES/Numeriser 22.jpg", caption: "Ensad Nancy, Offset Optimization Guide, Book Design & Offset Optimization, made with LCL, 2025", ratio: "16:9" },
    { type: "image", src: "assets/images/MACULES/Numeriser 16.jpg", caption: "Ensad Nancy, Offset Optimization Guide, Book Design & Offset Optimization, made with LCL, 2025", ratio: "2:3" },





    // ─── Fin des contenus ─────────────────────────────────────────────
];


/* =============================================================================
   2. CONSTRUCTION DE LA GRILLE
   =============================================================================
   
   - Hauteur de ligne calculée pour ~2 lignes sur desktop, ~1.5 sur mobile
   - Chaque item : largeur = hauteur × ratio
   - Flex-wrap CSS pour le passage à la ligne
   - Lazy loading via IntersectionObserver pour images, vidéos et Vimeo
   - preload="none" sur toutes les vidéos locales
   - Les vidéos/iframes ne se chargent que quand elles entrent dans le viewport
   
   ============================================================================= */

const gridImages = document.getElementById('gridImages');
const gridCaptions = document.getElementById('gridCaptions');
const panelImages = document.getElementById('panelImages');

const GAP = 5;
const PADDING = 10;

function getRowHeight() {
    const panelH = panelImages.clientHeight;
    const availableH = panelH - (PADDING * 2);
    const isMobile = window.innerWidth <= 768;
    const rowCount = isMobile ? 1.8 : 2.1;
    const gapCount = Math.floor(rowCount);
    return (availableH - (gapCount * GAP)) / rowCount;
}

/**
 * Lazy loading : les vidéos et iframes ne se chargent que
 * quand elles sont proches du viewport visible.
 * Les images utilisent le loading="lazy" natif du navigateur.
 */
let lazyObserver = null;

function setupLazyLoading() {
    if (lazyObserver) lazyObserver.disconnect();

    lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                if (el.tagName === 'VIDEO' && el.dataset.src) {
                    el.src = el.dataset.src;
                    el.load();
                    lazyObserver.unobserve(el);
                }

                if (el.tagName === 'IFRAME' && el.dataset.src) {
                    el.src = el.dataset.src;
                    lazyObserver.unobserve(el);
                }
            }
        });
    }, {
        /* Observe dans le scroll-content parent, pas le viewport global */
        root: null,
        rootMargin: '200px 0px'
    });
}

function buildGrid() {
    gridImages.innerHTML = '';
    gridCaptions.innerHTML = '';

    setupLazyLoading();

    const rowH = getRowHeight();

    PORTFOLIO_DATA.forEach((item) => {
        const ratio = parseRatio(item.ratio);
        const cellW = rowH * ratio;

        /* --- Cellule image --- */
        const imgCell = document.createElement('div');
        imgCell.className = 'img-cell';
        imgCell.style.width = cellW + 'px';
        imgCell.style.height = rowH + 'px';

        const loader = document.createElement('div');
        loader.className = 'loader-text';
        loader.innerHTML = '<span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span>';
        imgCell.appendChild(loader);

        /* Clic → ouvre dans un nouvel onglet */
        if (item.src) {
            imgCell.addEventListener('click', () => {
                if (item.type === 'vimeo') {
                    window.open('https://vimeo.com/' + item.src, '_blank');
                } else {
                    window.open(item.src, '_blank');
                }
            });
        }

        if (item.src) {
            if (item.type === 'vimeo') {
                const iframe = document.createElement('iframe');
                /* src différé → lazy loading */
                iframe.dataset.src = 'https://player.vimeo.com/video/' + item.src + '?background=1&autoplay=1&loop=1&muted=1';
                iframe.allow = 'autoplay';
                iframe.loading = 'lazy';
                imgCell.appendChild(iframe);
                lazyObserver.observe(iframe);
                iframe.addEventListener('load', () => {
                const l = imgCell.querySelector('.loader-text');
                if (l) l.remove();
                        });

            } else if (item.type === 'video') {
                const vid = document.createElement('video');
                /* src différé → lazy loading, pas de preload */
                vid.dataset.src = item.src;
                vid.preload = 'none';
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                imgCell.appendChild(vid);
                lazyObserver.observe(vid);
                vid.addEventListener('playing', () => {
                const l = imgCell.querySelector('.loader-text');
                 if (l) l.remove();
                        });
                

            } else {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.caption;
                img.loading = 'lazy';
                imgCell.appendChild(img);
                img.addEventListener('load', () => {
        const l = imgCell.querySelector('.loader-text');
        if (l) l.remove();
                    });
            }
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            imgCell.appendChild(placeholder);
        }

        gridImages.appendChild(imgCell);

        /* --- Cellule légende --- */
        const capCell = document.createElement('div');
        capCell.className = 'cap-cell';
        capCell.style.width = cellW + 'px';
        capCell.style.height = rowH + 'px';

        const p = document.createElement('p');
        p.textContent = item.caption;
        capCell.appendChild(p);

        gridCaptions.appendChild(capCell);

        /* Hover */
        imgCell.addEventListener('mouseenter', () => p.classList.add('is-active'));
        imgCell.addEventListener('mouseleave', () => p.classList.remove('is-active'));
    });
}

buildGrid();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        scrollPos = 0;
        velocity = 0;
        buildGrid();
        applyScroll();
    }, 80);
});


/* =============================================================================
   3. SCROLL SYNCHRONISÉ AVEC INERTIE
   =============================================================================
   
   Scroll fluide avec décélération progressive.
   Sur mobile, le geste tactile lance une vélocité qui ralentit
   naturellement, comme un scroll natif.
   
   ============================================================================= */

let scrollPos = 0;
let velocity = 0;
let isAnimating = false;
let lastTouchY = 0;
let lastTouchTime = 0;

const fadeTop = document.getElementById('fadeTop');

const FRICTION = 0.92;          /* Décélération (0.90 = rapide, 0.95 = lent) */
const MIN_VELOCITY = 0.5;      /* Seuil d'arrêt */

function updateFades() {
    if (scrollPos > 0) {
        fadeTop.classList.add('is-visible');
    } else {
        fadeTop.classList.remove('is-visible');
    }
}

function getMaxScroll() {
    const contentH = gridImages.scrollHeight + (PADDING * 2);
    const panelH = panelImages.clientHeight;
    return Math.max(0, contentH - panelH);
}

function applyScroll() {
    document.getElementById('scrollImages').style.transform = `translateY(${-scrollPos}px)`;
    document.getElementById('scrollCaptions').style.transform = `translateY(${-scrollPos}px)`;
    updateFades();
}

/** Boucle d'animation pour l'inertie */
function animateScroll() {
    if (Math.abs(velocity) < MIN_VELOCITY) {
        isAnimating = false;
        return;
    }

    scrollPos += velocity;
    velocity *= FRICTION;

    const maxScroll = getMaxScroll();
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    /* Rebond doux aux limites */
    if (scrollPos <= 0 || scrollPos >= maxScroll) {
        velocity = 0;
    }

    applyScroll();
    requestAnimationFrame(animateScroll);
}

function startAnimation() {
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animateScroll);
    }
}

/* --- Molette (desktop) --- */
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const maxScroll = getMaxScroll();
    scrollPos = Math.max(0, Math.min(scrollPos + e.deltaY, maxScroll));
    applyScroll();
}, { passive: false });

/* --- Tactile avec inertie (mobile) --- */
window.addEventListener('touchstart', (e) => {
    velocity = 0;
    isAnimating = false;
    lastTouchY = e.touches[0].clientY;
    lastTouchTime = Date.now();
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const currentY = e.touches[0].clientY;
    const currentTime = Date.now();
    const deltaY = lastTouchY - currentY;
    const deltaTime = currentTime - lastTouchTime;

    /* Calcul de la vélocité instantanée */
    if (deltaTime > 0) {
        velocity = deltaY / deltaTime * 16; /* Normaliser à ~60fps */
    }

    const maxScroll = getMaxScroll();
    scrollPos = Math.max(0, Math.min(scrollPos + deltaY, maxScroll));
    applyScroll();

    lastTouchY = currentY;
    lastTouchTime = currentTime;
}, { passive: false });

window.addEventListener('touchend', () => {
    /* Lancer l'inertie avec la vélocité accumulée */
    startAnimation();
});

/* --- Clavier --- */
window.addEventListener('keydown', (e) => {
    let delta = 0;
    if (e.key === 'ArrowDown') delta = 60;
    else if (e.key === 'ArrowUp') delta = -60;
    else if (e.key === 'PageDown') delta = 300;
    else if (e.key === 'PageUp') delta = -300;
    else if (e.key === 'Home') { scrollPos = 0; applyScroll(); return; }
    else if (e.key === 'End') { scrollPos = getMaxScroll(); applyScroll(); return; }
    else return;

    e.preventDefault();
    const maxScroll = getMaxScroll();
    scrollPos = Math.max(0, Math.min(scrollPos + delta, maxScroll));
    applyScroll();
});

function RandomizeVideo(randomNum) {
  var int = randomNum;
  var videoContainer = "";
  var video = "";
  var videoTitle = "";
  var transcriptLink = "";
  var downloadHref = "";
  var downloadTitle = "";
  var downloadText = "";

  if (int == 1) {
    videoContainer = "Qui nous sommes et ce que nous faisons";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/whwr-fra.mp4";
    videoTitle = "Qui nous sommes et ce que nous faisons";
    transcriptLink = "/bts/nws/vds/trnscrptwhwr-fra.html";
    downloadHref = "/bts/nws/vds/mp4/whwr-fra.mp4";
    downloadTitle = "Télécharger - Qui nous sommes et ce que nous faisons";
    downloadText = "Télécharger [mp4 29 mo]";
  }
  if (int == 2) {
    videoContainer = "Processus d’audience";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/nbhrngprcss-fra.mp4";
    videoTitle = "Processus d’audience";
    transcriptLink = "/bts/nws/vds/trnscrptnbhrngprcss-fra.html";
    downloadHref = "/bts/nws/vds/mp4/nbhrngprcss-fra.mp4";
    downloadTitle = "Télécharger - Processus d'audience";
    downloadText = "Télécharger [mp4 36 mo]";
  }
  if (int == 3) {
    videoContainer = "Demande de participation";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/atp-fra.mp4";
    videoTitle = "Demande de participation";
    transcriptLink = "/bts/nws/vds/trnscrptatp-fra.html";
    downloadHref = "/bts/nws/vds/mp4/atp-fra.mp4";
    downloadTitle = "Télécharger - Demande de participation";
    downloadText = "Télécharger [mp4 47 mo]";
  }
  if (int == 4) {
    videoContainer = "Répondre aux urgences";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/mrgnc-fra.mp4";
    videoTitle = "Répondre aux urgences";
    transcriptLink = "/bts/nws/vds/trnscrptmrgnc-fra.html";
    downloadHref = "/bts/nws/vds/mp4/mrgnc-fra.mp4";
    downloadTitle = "Télécharger - Répondre aux urgences";
    downloadText = "Télécharger [mp4 47 mo]";
  }
  if (int == 5) {
    videoContainer = "Explorer l’avenir énergétique du Canada";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/dtvslztn.mp4";
    videoTitle = "Explorer l’avenir énergétique du Canada";
    transcriptLink = "/bts/nws/vds/trnscrptdtvslztn-fra.html";
    downloadHref = "/bts/nws/vds/mp4/dtvslztn.mp4";
    downloadTitle = "Télécharger - Explorer l’avenir énergétique du Canada";
    downloadText = "Télécharger [mp4 12 mo]";
  }
  if (int == 6) {
    videoContainer = "Introduction aux vannes";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/intrvlvs-fra.mp4";
    videoTitle = "Introduction aux vannes";
    transcriptLink = "/bts/nws/vds/trnscrptvlvs-fra.html";
    downloadHref = "/bts/nws/vds/mp4/intrvlvs-fra.mp4";
    downloadTitle = "Télécharger - Introduction aux vannes";
    downloadText = "Télécharger [mp4 14 mo]";
  }
  if (int == 7) {
    videoContainer = "Introduction aux essais hydrostatiques";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/hdrsttc-fra.mp4";
    videoTitle = "Introduction aux essais hydrostatiques";
    transcriptLink = "/bts/nws/vds/trnscrpthdrsttc-fra.html";
    downloadHref = "/bts/nws/vds/mp4/hdrsttc-fra.mp4";
    downloadTitle = "Télécharger - Introduction aux essais hydrostatiques";
    downloadText = "Télécharger [mp4 21 mo]";
  }
  if (int == 8) {
    videoContainer = "Conformité et exécution";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/cmplncnfrcmnt-fra.mp4";
    videoTitle = "Conformité et exécution";
    transcriptLink = "/bts/nws/vds/trnscrptcmplncnfrcmnt-fra.html";
    downloadHref = "/bts/nws/vds/mp4/cmplncnfrcmnt-fra.mp4";
    downloadTitle = "Télécharger - Conformité et exécution";
    downloadText = "Télécharger [mp4 16 mo]";
  }
  if (int == 9) {
    videoContainer = "La démarche axée sur le cycle de vie";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/lfccl-fra.mp4";
    videoTitle = "La démarche axée sur le cycle de vie";
    transcriptLink = "/bts/nws/vds/trnscrptlfccl-fra.html";
    downloadHref = "/bts/nws/vds/mp4/lfccl-fra.mp4";
    downloadTitle = "Télécharger - La démarche axée sur le cycle de vie";
    downloadText = "Télécharger [mp4 13 mo]";
  }
  if (int == 10) {
    videoContainer = "Protection de l’environnement";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/nvrnmntlprtctn-fra.mp4";
    videoTitle = "Protection de l’environnement";
    transcriptLink = "/bts/nws/vds/trnscrptnvrnmntlprtctn-fra.html";
    downloadHref = "/bts/nws/vds/mp4/nvrnmntlprtctn-fra.mp4";
    downloadTitle = "Télécharger - Protection de l’environnement";
    downloadText = "Télécharger [mp4 24 mo]";
  }
  if (int == 11) {
    videoContainer = "Conception des pipelines";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/pplndsgn-fra.mp4";
    videoTitle = "Conception des pipelines";
    transcriptLink = "/bts/nws/vds/trnscrptpplndsgn-fra.html";
    downloadHref = "/bts/nws/vds/mp4/pplndsgn-fra.mp4";
    downloadTitle = "Télécharger - Conception des pipelines";
    downloadText = "Télécharger [mp4 16 mo]";
  }
  if (int == 12) {
    videoContainer = "Programmes d’entretien/Fouille d’intégrité";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/ntgrtdgs-fra.mp4";
    videoTitle = "Programmes d’entretien/Fouille d’intégrité";
    transcriptLink = "/bts/nws/vds/trnscrptntgrtdgs-fra.html";
    downloadHref = "/bts/nws/vds/mp4/ntgrtdgs-fra.mp4";
    downloadTitle = "Télécharger - Programmes d’entretien/Fouille d’intégrité";
    downloadText = "Télécharger [mp4 25 mo]";
  }
  if (int == 13) {
    videoContainer = "Restrictions de pression";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/prssrrstrctns-fra.mp4";
    videoTitle = "Restrictions de pression";
    transcriptLink = "/bts/nws/vds/trnscrptprssrrstrctns-fra.html";
    downloadHref = "/bts/nws/vds/mp4/prssrrstrctns-fra.mp4";
    downloadTitle = "Télécharger - Restrictions de pression";
    downloadText = "Télécharger [mp4 14 mo]";
  }
  if (int == 14) {
    videoContainer = "Emplacement des vannes";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/vlvplcmnt-fra.mp4";
    videoTitle = "Emplacement des vannes";
    transcriptLink = "/bts/nws/vds/trnscrptvlvplcmnt-fra.html";
    downloadHref = "/bts/nws/vds/mp4/vlvplcmnt-fra.mp4";
    downloadTitle = "Télécharger - Emplacement des vannes";
    downloadText = "Télécharger [mp4 15 mo]";
  }
  if (int == 15) {
    videoContainer = "Vivre et travailler à proximité d'un pipeline";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/lvngndwrkng-fra.mp4";
    videoTitle = "Vivre et travailler à proximité d'un pipeline";
    transcriptLink = "/bts/nws/vds/trnscrptlvngndwrkng-fra.html";
    downloadHref = "/bts/nws/vds/mp4/lvngndwrkng-fra.mp4";
    downloadTitle =
      "Télécharger - Vivre et travailler à proximité d'un pipeline";
    downloadText = "Télécharger [mp4 21 mo]";
  }
  if (int == 16) {
    videoContainer = "Les raccords de tuyauterie";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/ppfttngs-fra.mp4";
    videoTitle = "Les raccords de tuyauterie";
    transcriptLink = "/bts/nws/vds/trnscrptppfttngs-fra.html";
    downloadHref = "/bts/nws/vds/mp4/ppfttngs-fra.mp4";
    downloadTitle = "Télécharger - Les raccords de tuyauterie";
    downloadText = "Télécharger [mp4 21 mo]";
  }

  document.write('<figure class="wb-mltmd">');
  document.write('<video id="videoContainer" title="' + videoContainer + '">');
  document.write(
    '	<source id="videoSource" type="video/mp4" src="' + video + '" ></source>'
  );
  document.write("</video>");
  document.write("<figcaption>");
  document.write('	<div class="row">');
  document.write(
    '	  <div class="col-md-12 text-center mrgn-bttm-md"><p class="small mrgn-tp-sm"><span id="videoTitle">' +
      videoTitle +
      "</span><br />"
  );
  document.write(
    '	    <a id="transcriptLink" href="' +
      transcriptLink +
      '" class="pull-left">Transcription</a>'
  );
  document.write(
    '        <span class="pull-right"><a id="downloadLink" href="' +
      downloadHref +
      '" title="' +
      downloadTitle +
      '">' +
      downloadText +
      "</a></span></p>"
  );
  document.write("	  </div>");
  document.write("    </div>");
  document.write("</figcaption>");
  document.write("</figure>");
}

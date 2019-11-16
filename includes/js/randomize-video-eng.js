function RandomizeVideo(randomNum) {
  var int = randomNum;
  var videoContainer;
  var video;
  var videoTitle;
  var transcriptLink;
  var downloadHref;
  var downloadTitle;
  var downloadText;

  if (int == 1) {
    videoContainer = "Who We Are";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/whwr-eng.mp4";
    videoTitle = "Who We Are and What We Do";
    transcriptLink = "/bts/nws/vds/trnscrptwhwr-eng.html";
    downloadHref = "/bts/nws/vds/mp4/whwr-eng.mp4";
    downloadTitle = "Download - Who We Are";
    downloadText = "Download [mp4 28 MB]";
  }
  if (int == 2) {
    videoContainer = "Hearing Process";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/nbhrngprcss-eng.mp4";
    videoTitle = "Hearing Process";
    transcriptLink = "/bts/nws/vds/trnscrptnbhrngprcss-eng.html";
    downloadHref = "/bts/nws/vds/mp4/nbhrngprcss-eng.mp4";
    downloadTitle = "Download - Hearing Process";
    downloadText = "Download [mp4 32 MB]";
  }
  if (int == 3) {
    videoContainer = "Application to Participate";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/atp-eng.mp4";
    videoTitle = "Application to Participate";
    transcriptLink = "/bts/nws/vds/trnscrptatp-eng.html";
    downloadHref = "/bts/nws/vds/mp4/atp-eng.mp4";
    downloadTitle = "Download - Application to Participate";
    downloadText = "Download [mp4 46 MB]";
  }
  if (int == 4) {
    videoContainer = "Responding to Emergencies";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/mrgnc-eng.mp4";
    videoTitle = "Responding to Emergencies";
    transcriptLink = "/bts/nws/vds/trnscrptmrgnc-eng.html";
    downloadHref = "/bts/nws/vds/mp4/mrgnc-eng.mp4";
    downloadTitle = "Download - Responding to Emergencies";
    downloadText = "Download [mp4 44 MB]";
  }
  if (int == 5) {
    videoContainer = "Exploring Canada/’s Energy Future";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/dtvslztn.mp4";
    videoTitle = "Exploring Canada’s Energy Future";
    transcriptLink = "/bts/nws/vds/trnscrptdtvslztn-eng.html";
    downloadHref = "/bts/nws/vds/mp4/dtvslztn.mp4";
    downloadTitle = "Download - Exploring Canada/’s Energy Future";
    downloadText = "Download [mp4 12 MB]";
  }
  if (int == 6) {
    videoContainer = "Intro to: Valves";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/intrvlvs-eng.mp4";
    videoTitle = "Intro to: Valves";
    transcriptLink = "/bts/nws/vds/trnscrptvlvs-eng.html";
    downloadHref = "/bts/nws/vds/mp4/intrvlvs-eng.mp4";
    downloadTitle = "Download - Intro to: Valves";
    downloadText = "Download [mp4 13 MB]";
  }
  if (int == 7) {
    videoContainer = "Intro to: Hydrostatic Testing";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/hdrsttc-eng.mp4";
    videoTitle = "Intro to: Hydrostatic Testing";
    transcriptLink = "/bts/nws/vds/trnscrpthdrsttc-eng.html";
    downloadHref = "/bts/nws/vds/mp4/hdrsttc-eng.mp4";
    downloadTitle = "Download - Intro to: Hydrostatic Testing";
    downloadText = "Download [mp4 21 MB]";
  }
  if (int == 8) {
    videoContainer = "Compliance and Enforcement";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/cmplncnfrcmnt-eng.mp4";
    videoTitle = "Compliance and Enforcement";
    transcriptLink = "/bts/nws/vds/trnscrptcmplncnfrcmnt-eng.html";
    downloadHref = "/bts/nws/vds/mp4/cmplncnfrcmnt-eng.mp4";
    downloadTitle = "Download - Compliance and Enforcement";
    downloadText = "Download [mp4 14 MB]";
  }
  if (int == 9) {
    videoContainer = "The Lifecycle Approach";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/lfccl-eng.mp4";
    videoTitle = "The Lifecycle Approach";
    transcriptLink = "/bts/nws/vds/trnscrptlfccl-eng.html";
    downloadHref = "/bts/nws/vds/mp4/lfccl-eng.mp4";
    downloadTitle = "Download - The Lifecycle Approach";
    downloadText = "Download [mp4 11 MB]";
  }
  if (int == 10) {
    videoContainer = "Environmental Protection";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/nvrnmntlprtctn-eng.mp4";
    videoTitle = "Environmental Protection";
    transcriptLink = "/bts/nws/vds/trnscrptnvrnmntlprtctn-eng.html";
    downloadHref = "/bts/nws/vds/mp4/nvrnmntlprtctn-eng.mp4";
    downloadTitle = "Download - Environmental Protection";
    downloadText = "Download [mp4 21 MB]";
  }
  if (int == 11) {
    videoContainer = "Pipeline Design";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/pplndsgn-eng.mp4";
    videoTitle = "Pipeline Design";
    transcriptLink = "/bts/nws/vds/trnscrptpplndsgn-eng.html";
    downloadHref = "/bts/nws/vds/mp4/pplndsgn-eng.mp4";
    downloadTitle = "Download - Pipeline Design";
    downloadText = "Download [mp4 14 MB]";
  }
  if (int == 12) {
    videoContainer = "Maintenance Programs/Integrity Digs";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/ntgrtdgs-eng.mp4";
    videoTitle = "Maintenance Programs/Integrity Digs";
    transcriptLink = "/bts/nws/vds/trnscrptntgrtdgs-eng.html";
    downloadHref = "/bts/nws/vds/mp4/ntgrtdgs-eng.mp4";
    downloadTitle = "Download - Maintenance Programs/Integrity Digs";
    downloadText = "Download [mp4 21 MB]";
  }
  if (int == 13) {
    videoContainer = "Pressure Restrictions";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/prssrrstrctns-eng.mp4";
    videoTitle = "Pressure Restrictions";
    transcriptLink = "/bts/nws/vds/trnscrptprssrrstrctns-eng.html";
    downloadHref = "/bts/nws/vds/mp4/prssrrstrctns-eng.mp4";
    downloadTitle = "Download - Pressure Restrictions";
    downloadText = "Download [mp4 13 MB]";
  }
  if (int == 14) {
    videoContainer = "Valve Placement";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/vlvplcmnt-eng.mp4";
    videoTitle = "Valve Placement";
    transcriptLink = "/bts/nws/vds/trnscrptvlvplcmnt-eng.html";
    downloadHref = "/bts/nws/vds/mp4/vlvplcmnt-eng.mp4";
    downloadTitle = "Download - Valve Placement";
    downloadText = "Download [mp4 14 MB]";
  }
  if (int == 15) {
    videoContainer = "Living and Working Near Pipelines";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/lvngndwrkng-eng.mp4";
    videoTitle = "Living and Working Near Pipelines";
    transcriptLink = "/bts/nws/vds/trnscrptlvngndwrkng-eng.html";
    downloadHref = "/bts/nws/vds/mp4/lvngndwrkng-eng.mp4";
    downloadTitle = "Download - Living and Working Near Pipelines";
    downloadText = "Download [mp4 20 MB]";
  }
  if (int == 16) {
    videoContainer = "Pipe Fittings";
    video = "http://www.cer-rec.gc.ca/bts/nws/vds/mp4/ppfttngs-eng.mp4";
    videoTitle = "Pipe Fittings";
    transcriptLink = "/bts/nws/vds/trnscrptppfttngs-eng.html";
    downloadHref = "/bts/nws/vds/mp4/ppfttngs-eng.mp4";
    downloadTitle = "Download - Pipe Fittings";
    downloadText = "Download [mp4 20 MB]";
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
      '" class="pull-left">Transcript</a>'
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

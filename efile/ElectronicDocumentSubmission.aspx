


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>
        </title>

    <script src="/include/chkbrows.js" type="text/javascript"></script>

    <link href="./include/EFileStyleSheet.css" type="text/css" rel="stylesheet" />
    <meta content="Microsoft Visual Studio 7.0" name="GENERATOR"/>
    <meta content="C#" name="CODE_LANGUAGE"/>
    <meta content="JavaScript" name="vs_defaultClientScript"/>
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema"/>

    <!-- Google analytics begin for keener -->
    <!-- Google Analytics UA Tag removed --> 
    <!-- Google analytics end --> 

</head>
<body>
    <form name="Form1" method="post" action="./SubmissionError.aspx?aspxerrorpath=%2fefile%2fElectronicDocumentSubmission.aspx" id="Form1">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="lX7SekQ++hfpS6O0/hZwinRgKzTJsvL8AbKG0JhksfxSzPGC9gq9YN7Qw3wupaaQ8j4dcsGm1NDA8gS1DO3/9+PF0AdK6OuSIureJ79SDWpdzdDcyfriz9Wt5vHmasBz7F1353qtIEmGNDfwKM7Ddg==" />

<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="6FA540A8" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="fXg2cAMJWsnA/BJohJiHc6b2k0bukBgmtfE6nQEA8dLwo3shKkKBLu+ehNwZDohBrokpEZgrndo8OHVRPFPV/2xAd8B2KNbJ0Pv9FuNlReH2XcEPGsbSAW+WfgsLx/H2" />
    	<style>
		A.nav { text-decoration:none; color:#ffffff; }
		A.nav:hover { text-decoration:none; color:#000000; }
	</style>

	<script language="JavaScript1.2">
		function MM_swapImgRestore() {
			var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
		}

		function MM_findObj(n, d) {
			var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
			d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
			if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
			for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
			if(!x && document.getElementById) x=document.getElementById(n); return x;
		}

		function MM_swapImage() {
			var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
			if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
		}
	</script>

	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr bgcolor="#FFFFFF">
			<td align="left" valign="bottom"><img src="images/CoatArmsLeft_e.jpg" alt="Canada Energy Regulator - Coat of Arms" title="Canada Energy Regulator - Coat of Arms" width="228" height="57"></td>
			<td align="right" valign="bottom"><img src="images/Canada.jpg" alt="Canada Wordmark" title="Canada Wordmark" width="91" height="29"></td>
		</tr>
		<tr>
			<td bgcolor="#003366">
			<table cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td nowrap align="left" valign="middle">
						<font color="#FFFFFF" face="Arial,Helvetica,sans-serif" size="3">&nbsp;<b>
						
						
						
<span id="lblPageTitle">
			Thank You
    </span>
    						</b></font>
					</td>
				</tr>
			</table>
			</td>
			<td noWrap align=right bgColor="#003366" width="100%">
				<table cellpadding=0 cellspacing=0 border=0>


					<tr>
						<td nowrap><a href="<%=ConfigurationManager.AppSettings["EDS.HelpLink-ENG"]%>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('guide','','images/nebbutton_over.gif',1)"><img name="guide" border="0" src="images/nebbutton.gif" width="21" height="28" alt=" "></a></td>
						<td nowrap><a href="<%=ConfigurationManager.AppSettings["EDS.HelpLink-ENG"]%>" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('guide','','images/nebbutton_over.gif',0)" class=nav><font color=#FFFFFF face="Arial,Helvetica,sans-serif" size="2" style='text-decoration:none'>Filers Guide&nbsp;</font></a></td>
						<td nowrap>&nbsp;</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<br />

    <p>
    </p>
        <table style="border: 2px solid #003366; border-spacing: 0px; border-collapse:collapse; width: 620px; height: 279px; margin-left:auto; margin-right:auto;">
            <tr style="border: 2px solid #003366;">
                <td width="614" colspan="3">
                    <span id="lblCancel"> Your submission has been cancelled due to a system problem.
                    </span>
                    <br />
                    <span id="lblError" style="font-weight: bold;">Error:</span>
                    <br />
                    <span class="Important">
                        <span id="lblSessionTimeout">An error occurred.</span>
                        
                    </span>
                    <br />
                    <br />
                    <span id="lblTryAgain">
							Please try again. If the problem persists, please 
                    </span>&nbsp;<a id="HLContact" href="#">contact the Canada Energy Regulator.</a>&nbsp;<span id="lblPostContact"></span>
                </td>
            </tr>
            <tr style="border: 2px solid #003366;">
                <td class="header" width="50">
                    &nbsp;
                </td>
                <td class="header" align="right" width="250">
                    <p style="text-align: left;">
                        <input type="submit" name="ButHome" value="Home" id="ButHome" /></p>
                </td>
                <td class="header" align="right" width="313">
                    <p style="text-align: left;">
                        &nbsp;</p>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>

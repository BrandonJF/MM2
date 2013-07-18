<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' >
<xsl:output method="xml" omit-xml-declaration="yes"/>
<xsl:template match="EventItem">
<span class="side-list"><h4><xsl:value-of select="eventname"/></h4>
<p><em class="date"><a href="/Events/EventInfo/sessionaltcd/{eventcode}.aspx"><xsl:value-of select="eventstartdate"/> - <xsl:value-of select="eventenddate"/></a></em><br />
<xsl:value-of select="description"/>... <em><a href="/Events/EventInfo/sessionaltcd/{eventcode}.aspx">view event</a></em><br /><br /></p>
</span>
</xsl:template>
</xsl:stylesheet>
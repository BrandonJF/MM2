<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' >
<xsl:output method="xml" omit-xml-declaration="yes"/>
<xsl:template match="featuredEventItem">
<p><span class="side-list"><strong><xsl:value-of select="eventname"/></strong><br />
<em class="date"><a href="/Events/EventInfo/sessionaltcd/{eventcode}.aspx"><xsl:value-of select="eventstartdate"/> - <xsl:value-of select="eventenddate"/></a></em><br />
<xsl:value-of select="description"/><br />
</span></p>
</xsl:template>
</xsl:stylesheet>
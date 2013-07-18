<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' >
<xsl:output method="xml" omit-xml-declaration="yes"/>
<xsl:template match="ProductItem">
<p><span class="side-list"><a href="/Products/ProductInfo/productcd/{productcode}.aspx"><strong><xsl:value-of select="productname"/></strong></a>
</span></p>
</xsl:template>
</xsl:stylesheet>




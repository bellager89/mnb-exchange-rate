using System.Xml.Serialization;

namespace MNBExchangeRate.Dtos
{
    [XmlRoot(ElementName = "Rate")]
    public class Rate
    {

        [XmlAttribute(AttributeName = "unit")]
        public int Unit { get; set; }

        [XmlAttribute(AttributeName = "curr")]
        public string Curr { get; set; }

        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "Day")]
    public class Day
    {

        [XmlElement(ElementName = "Rate")]
        public List<Rate> Rate { get; set; }

        [XmlAttribute(AttributeName = "date")]
        public DateTime Date { get; set; }
    }

    [XmlRoot(ElementName = "MNBCurrentExchangeRates")]
    public class MNBCurrentExchangeRates
    {

        [XmlElement(ElementName = "Day")]
        public Day Day { get; set; }
    }
}

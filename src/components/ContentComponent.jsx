import React from "react";
import IMAGE_1 from "../assets/1.jpeg";
import IMAGE_2 from "../assets/2.jpeg";

const ContentComponent = () => {
  return (
    <div className="flex flex-col gap-4 mt-10 pr-20">
      <h1 className="font-bold text-2xl w-9/12">
        Prozessfähigkeitsanalyse online und kostenlos mit dem Analyse Tool von
        QM-Datalab
      </h1>
      <p>
        Analysiere unkompliziert und kostenlos online deine Prozessdaten. Füge
        einfach deine Daten in das QM-Datalab Tool ein, wähle aus welche Daten
        du auswerten möchtest und QM-Datalab erstellt dir alle benötigten
        Analysen, Kennwerte und Diagramme.
      </p>
      <h1 className="font-semibold text-xl w-9/12">
        Die großen Vorteile von QM-Datalab
      </h1>
      <ul className="list-disc pl-16">
        <li>
          Von QM-Manager für QM-Manager: Genau die Analysen, die du brauchst
        </li>
        <li>
          100% Datensicherheit: Die Analysen werden nur auf deinem Gerät im
          Browser durchgeführt, es werden keinerlei Daten an Server gesendet
        </li>
        <li>Einzigartige Nutzerfreundlichkeit: Alle Analysen auf Knopfdruck</li>
        <li>Kein Installations- und Wartungsaufwand: Direkt im Browser</li>
      </ul>
      <h1 className="font-bold text-2xl w-9/12">
        Prozessfähigkeitsanalyse im Qualitätsmanagement
      </h1>
      <p>
        Die Prozessfähigkeitsanalyse ist eine wertvolle statistische Methode um
        die inhärente Fähigkeit eines Prozesses, die Kundenspezifikationen zu
        erfüllen, zu bewerten und quantifizieren. Sie bietet Organisationen
        Einblicke in die Leistungsfähigkeit ihrer Prozesse und hilft dabei,
        Verbesserungspotenziale zu identifizieren. Wir werden den Zweck der
        Prozessfähigkeitsanalyse erläutern und uns mit den wichtigsten
        Kennzahlen befassen, nämlich Cm, Cmk, Cp und Cpk.
      </p>
      <h1 className="font-semibold text-xl w-9/12">
        Zweck der Prozessfähigkeitsanalyse
      </h1>
      <p>
        Der Hauptzweck der Prozessfähigkeitsanalyse besteht darin, die Fähigkeit
        eines Prozesses zu bewerten, konsistent Ergebnisse innerhalb bestimmter
        Toleranzgrenzen zu liefern. Sie ermöglicht es Organisationen
        festzustellen, ob ihre Prozesse in der Lage sind, die Anforderungen der
        Kunden zu erfüllen, und bietet eine Grundlage für Entscheidungsfindung
        und Maßnahmen zur Prozessverbesserung. Durch das Verständnis der
        Prozessfähigkeit können Organisationen Quellen von Variationen
        identifizieren, Fehler reduzieren und die Zufriedenheit der Kunden
        verbessern.
      </p>
      <h1 className="font-semibold text-xl w-9/12">
        Fähigkeitsindizes Cm, Cmk, Cp, Cpk
      </h1>
      <p>
        Fähigkeitsindizes sind numerische Maße, die die Prozessfähigkeit in
        Bezug auf die Spezifikationsgrenzen quantifizieren. Sie bieten eine
        standardisierte Möglichkeit, die Leistungsfähigkeit eines Prozesses zu
        bewerten und zu vergleichen. Hier sind die wichtigsten
        Fähigkeitsindizes:
      </p>
      <p>Die einzelnen Buchstaben der Abkürzungen stehen für:</p>
      <ul className="list-inside list-disc">
        <li>C: Capability („Fähigkeit“)</li>
        <li>m: machine</li>
        <li>p: process</li>
        <li>
          K: Katayori (japanisch), was so viel heißt wie „Bias“ oder
          „Verschiebung“
        </li>
      </ul>
      <h1 className="font-semibold text-xl w-9/12">
        Unterschied zwischen „Maschine“ und „Prozess“
      </h1>
      <p>
        Bei der Unterscheidung zwischen der Maschinen- und Prozessfähigkeit geht
        es vor allem um den Unterschied im Faktor Zeit:
      </p>
      <ul>
        <li>
          Die Maschinenfähigkeit (Cm, Cmk) ist eher eine <b>Momentaufnahme</b>{" "}
          und quantifiziert, wie gut eine Maschine im Prinzip in der Lage ist,
          die Kundenspezifikation einzuhalten. In diesem kurzen Zeitraum können
          sich eigentlich nur Störungen aus den Bereichen „Maschine“ und
          „Messung“ auf das Messergebnis auswirken.
          <img className="md:w-[70%] m-auto" src={IMAGE_2} />
        </li>

        <li>
          Die Maschinenfähigkeit (Cp, Cpk) ist eine <b>Langfristaufnahme</b> und
          quantifiziert, wie gut ein Prozess über längere Zeit in der Lage ist,
          die Kundenspezifikation einzuhalten. In diesem längeren Zeitraum
          können sich Störungen aus vielen Bereichen auf das Messergebnis
          auswirken. Häufig nimmt man über die Zeit (leichte)
          Mittelwertsverschiebungen wahr. Diese führen in der Regel zu einer
          größeren Gesamtstreuung vom gemessenen Merkmal und damit zu geringere
          Fähigkeitskennwerten (Cp &lt; Cm und Cmk &lt; Cpk).
          <img className="md:w-[70%] m-auto" src={IMAGE_1} />
        </li>
        <p>Ishikawa</p>
      </ul>
      <h1 className="font-semibold text-xl w-9/12">
        Unterschied zwischen „C“ und „CK“
      </h1>
      <h1 className="font-semibold text-base w-9/12">
        „Potentielle“ Fähigkeiten Cm und Cp
      </h1>
      <p>
        Cm und Cp sind Fähigkeitskennwerte, die die Streuung der Prozessdaten im
        Vergleich zu der Toleranzbreite quantifizieren, ohne eine mögliche
        Verschiebung des Prozesses zu berücksichtigen. Diese Kennwerte liefern
        Einblicke in die inhärente Fähigkeit des Prozesses, ohne dessen
        Ausrichtung an den Spezifikationsgrenzen zu berücksichtigen.
      </p>
      <p>Der Cm- beziehungsweise Cp-Wert wird wie folgt berechnet:</p>
      <p>
        C<sub>m</sub> ÷ C<sub>p</sub> = (OSG - USG) / (6α)
      </p>
      <p>Wo α die Standardabweichung der Messdaten ist.</p>
      <h1 className="font-semibold text-base w-9/12">
        „Tatsächliche“ Fähigkeiten Cmk und Cpk
      </h1>
      <p>
        Cmk und Cpk sind ähnlich wie Cm und Cp, berücksichtigen jedoch
        zusätzlich etwaige Abweichungen oder Verschiebungen des Prozesses vom
        Zielwert. Diese Kennwerte liefern eine umfassende Bewertung der
        Fähigkeit, indem sie sowohl die Streuung der Prozessdaten als auch den
        Abstand zwischen dem Prozessmittelwert und den Spezifikationsgrenzen
        berücksichtigen.
      </p>
      <p>
        Der Kennwerte CmK und CpK werden folgendermaßen aus dem arithmetischen
        Mittelwert &micro;, der dazugehörigen Standardabweichung α der Messdaten
        und der oberen (OSG) beziehungsweise unteren (USG) Spezifikationsgrenze
        berechnet:
      </p>
      <p>
        C<sub>mk</sub> order C<sub>pk</sub> = min ( &mu; - USG , OSG - &mu; ) /
        3&sigma;
      </p>
      <p>
        Je höher dieser Wert ist, desto sicherer befindet sich das geprüfte
        Merkmal innerhalb der Kundenspezifikation.
      </p>
      <p>
        Bei den Fähigkeitskennwerten Cm und Cp spricht man häufig auch von der
        „potentiellen Fähigkeit“, da man diese Fähigkeitskennwerte erreichen
        könnte, wenn man den Prozess zentrieren würde.{" "}
      </p>
      <p>
        Im besten Fall (Prozessmittelwert liegt genau in der Mitte des
        Toleranzbereichs) ist CpK = Cp; sonst ist CpK &lt; Cp.
      </p>
      <p>
        Als Grenzwert für Fähigkeitskennwerte werden in vielen Industrien häufig
        1,33 oder 1,67 angesetzt
      </p>
      <p>
        Die Kennwerte lassen sich nach dieser Definition nur dann berechnen,
        wenn sowohl eine obere als auch untere Spezifikationsgrenze definiert
        ist (beidseitig tolerierte Merkmale)
      </p>
      <h1 className="font-bold text-2xl w-9/12">
        Vorteile der Prozessfähigkeitsanalyse
      </h1>
      <p>
        Die Prozessfähigkeitsanalyse bietet mehrere Vorteile im
        Qualitätsmanagement:
      </p>
      <ul className="list-decimal list-inside pl-10 flex flex-col gap-5">
        <li>
          Leistungsbeurteilung: Sie bietet eine quantitative Messgröße für die
          Prozessleistung und ermöglicht es Organisationen festzustellen, ob
          ihre Prozesse die Anforderungen der Kunden erfüllen.
        </li>
        <li>
          Bei Prüfentscheiden wird das Risiko von Alpha- und Beta-Fehlern
          reduziert, wenn der Prozess eine gute Fähigkeit hat.
        </li>
        <li>
          Identifizierung von Variationen: Durch die Analyse der
          Prozessfähigkeit können Organisationen Quellen von Variationen
          identifizieren und sich auf die Reduzierung konzentrieren, um die
          Prozessstabilität und -konsistenz zu verbessern.
        </li>
        <li>
          Identifizierung von Variationen: Durch die Analyse der
          Prozessfähigkeit können Organisationen Quellen von Variationen
          identifizieren und sich auf die Reduzierung konzentrieren, um die
          Prozessstabilität und -konsistenz zu verbessern.
        </li>
        <li>
          Entscheidungsfindung: Die aus der Prozessfähigkeitsanalyse gewonnenen
          Erkenntnisse unterstützen eine fundierte Entscheidungsfindung in Bezug
          auf Prozessänderungen, Lieferantenauswahl und Kundenanforderungen.
        </li>
      </ul>
      <h1 className="font-bold text-2xl w-9/12">Fazit</h1>
      <p>
        Die Prozessfähigkeitsanalyse ist ein wichtiges Werkzeug im
        Qualitätsmanagement, das es Organisationen ermöglicht, ihre Prozesse zu
        bewerten und zu verbessern. Durch das Verständnis der Fähigkeitsindizes
        wie Cm, Cmk, Cp und Cpk erhalten Organisationen wertvolle Einblicke in
        die Leistungsfähigkeit ihrer Prozesse, Variationen und die Ausrichtung
        an den Kundenspezifikationen.
      </p>
      <p>
        Dies unterstützt sie bei der Umsetzung von Maßnahmen zur
        Prozessverbesserung, Steigerung der Effizienz und Erhöhung der
        Kundenzufriedenheit.
      </p>
      <p>
        Die Prozessfähigkeitsanalyse ermöglicht es Organisationen, datenbasierte
        Entscheidungen zu treffen und ihre Qualität und Wettbewerbsfähigkeit
        kontinuierlich zu verbessern
      </p>
    </div>
  );
};

export default ContentComponent;

package game.model;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class Player {
    
    @XmlElement
    private String name;

    Player(){}
    Player(String name){
        this.name=name;
    }

}

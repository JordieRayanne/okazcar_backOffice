/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package main;

import java.util.List;

import model.Look;
import model.Matiere;
import model.MatiereLook;
import model.Produit;

/**
 *
 * @author Alex_Razakatoanina
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        try {
            Look l = new Look();
            List<Look> looklist = l.getAll(null);
            System.out.println("haha");
            for (Look look : looklist) {
                System.out.println(".."+look.getId());
            }
            MatiereLook ml=new MatiereLook();
            int lookId=1;
            List<MatiereLook> listml=ml.getAllByIdLook(null,lookId);
            for(MatiereLook mk:listml){
                System.out.println("==="+mk.getMatiere());
            }
            
            Matiere matiere=new Matiere();
            List<Matiere> matieres=matiere.getAll(null);
            for(Matiere ma:matieres){
                System.out.println("matiere:"+ma.getDesignation());
            }
            
            Produit produit=new Produit();
            List<Produit> produits=produit.getAll(null);
            
            for(Produit p:produits){
                System.out.println("matiere:"+p.getNom());
                System.out.println("matiere:"+p.getLook());

            }
                        
        } catch (Exception e) {
            e.printStackTrace();
        }  
    }
    
}

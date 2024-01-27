/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import dbaccess.PostgresConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 *
 * @author LENOVO
 */
public class Produit_fabrication_employe {
    private int id;
    private int idProduit;
    private int idEmploye;
    private int idFonction;
    private double heureTravail;
    private double salaireParHeure;
    private double salaireTotal;

    public Produit_fabrication_employe(){
        
    }

    public Produit_fabrication_employe(int id, int idProduit, int idEmploye, int idFonction, double heureTravail, double salaireParHeure) {
        this.id = id;
        this.idProduit = idProduit;
        this.idEmploye = idEmploye;
        this.idFonction = idFonction;
        this.heureTravail = heureTravail;
        this.salaireParHeure = salaireParHeure;
        this.salaireTotal = heureTravail * salaireParHeure;
    }
    
    public static void insertProduitFabrication(int idProduit, int idEmploye, int idFonction, double heureTravail, double salaireParHeure)throws Exception{
        String sql = "INSERT INTO produit_fabrication_employe (id_produit,id_employe,id_fonction,heure_travail,salaire_par_heure,salaire_totale)  VALUES (? , ? , ? , ? , ? , ?)";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1, idProduit);
        prst.setInt(2, idEmploye);
        prst.setInt(3, idFonction);
        prst.setDouble(4, heureTravail);
        prst.setDouble(5, salaireParHeure);
        prst.setDouble(6, heureTravail * salaireParHeure);
        prst.execute();
        System.out.print("SQL :"+prst.toString());
        con.close();
        prst.close();
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdProduit() {
        return idProduit;
    }

    public void setIdProduit(int idProduit) {
        this.idProduit = idProduit;
    }

    public int getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(int idEmploye) {
        this.idEmploye = idEmploye;
    }

    public int getIdFonction() {
        return idFonction;
    }

    public void setIdFonction(int idFonction) {
        this.idFonction = idFonction;
    }

    public double getHeureTravail() {
        return heureTravail;
    }

    public void setHeureTravail(double heureTravail) {
        this.heureTravail = heureTravail;
    }

    public double getSalaireParHeure() {
        return salaireParHeure;
    }

    public void setSalaireParHeure(double salaireParHeure) {
        this.salaireParHeure = salaireParHeure;
    }

    public double getSalaireTotal() {
        return salaireTotal;
    }

    public void setSalaireTotal(double salaireTotal) {
        this.salaireTotal = salaireTotal;
    }
    
}

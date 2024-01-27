/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import dbaccess.PostgresConnection;
import java.sql.Statement;

/**
 *
 * @author Alex_Razakatoanina
 */
public class Produit {
    int id;
    String nom;
    int article;
    int look;
    int taille;
    int type;
    
    Date debutfabrication;
    Date finfabrication;
    
    double prixVente;

    public Produit() {
    }

    public Produit(int id, double prixVente) {
        this.setId(id);
        this.setPrixVente(prixVente);
    }
    
    public void insertProduitPrix(Connection connection) throws Exception {
        boolean isOpen = connection == null;
    
        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }
            String sql = "INSERT INTO produit_prix(id_produit,prix_vente) VALUES (?,?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setInt(1, this.getId());
                preparedStatement.setDouble(2, this.getPrixVente());
                
                try {
                    preparedStatement.execute();
                    System.out.println("insert: " + preparedStatement.toString());
                } catch (SQLException e) {
                    throw e;
                }
            }
        } finally {
            if (isOpen && connection != null) {
                connection.close();
            }
        }
    }
    
    

    public double getPrixVente() {
        return prixVente;
    }

    public void setPrixVente(double prixVente) {
        this.prixVente = prixVente;
    }
    
    

    public void insert(Connection connection) throws Exception {
        boolean isOpen = connection == null;
    
        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }
            String sql = "INSERT INTO produit(nom,id_article,id_look,id_taille,id_type) VALUES (?, ?,?,?,?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, this.getNom());
                preparedStatement.setInt(2, this.getArticle());
                preparedStatement.setInt(3, this.getLook());
                preparedStatement.setInt(4, this.getTaille());
                preparedStatement.setInt(5, this.getType());
                try {
                    preparedStatement.executeQuery();
                    System.out.println("insert: " + preparedStatement.toString());
                } catch (SQLException e) {
                    throw e;
                }
            }
        } finally {
            if (isOpen && connection != null) {
                connection.close();
            }
        }
    }

    public static List<Produit> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<Produit> coupures=new ArrayList<>();
        String sql="select * from produit";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    Produit coupure=new Produit();
                    coupure.setId(resultSet.getInt("id"));
                    coupure.setNom(resultSet.getString("nom"));
                    coupure.setArticle(resultSet.getInt("id_article"));
                    coupure.setLook(resultSet.getInt("id_look"));
                    coupure.setTaille(resultSet.getInt("id_taille"));
                    coupure.setType(resultSet.getInt("id_type"));

                    coupures.add(coupure);
                }
            }
        } finally{
            if (isOpen && connection!=null) {
                connection.close();
            }
        }
        return coupures;
    }

    public Produit(int id,String nom,int article,int look,int taille,int type){
        this.setId(id);
        this.setNom(nom);
        this.setArticle(article);
        this.setLook(look);
        this.setTaille(taille);
        this.setType(type);
    }
    
    public int getQteMatiere(int idMatiere)throws Exception{
       int qte = 0;
        String sql = "SELECT * FROM rel_produit_matiere WHERE id_matiere = ? AND id_produit=?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, idMatiere);
        st.setInt(2,this.getId());
        ResultSet res = st.executeQuery();
        if(res.next()){
            qte = res.getInt("quantite");
        }
        res.close();
        st.close();
        con.close();
        return qte;
    }
public static void updateView()throws Exception{
        String sql = "create or replace view info_prix as (select prix,produit.id,quantite from produit join quantite_matiere on produit.id = quantite_matiere.id_produit join look on produit.id_look = look.id join matiere on quantite_matiere.id_matiere = matiere.id)";
        Connection con = PostgresConnection.getConnection();
        Statement st = con.createStatement();
        st.executeUpdate(sql);
        st.close();
        con.close();
    }
    
    public double getPriceById()throws Exception{
        int idProduit = this.getId();
       updateView();
       String sql = "select SUM(prix * quantite) as prix_total from info_prix where id="+idProduit+"";
       Connection con = PostgresConnection.getConnection();
       Statement st = con.createStatement();
       ResultSet res = st.executeQuery(sql);
       double prix = 0;
       if(res.next()){
           prix = res.getDouble("prix_total");
       }
       res.close();
       st.close();
       con.close();
       return prix;
    }
    
    public List<Integer> getMatieres()throws Exception{
        List<Integer> idMatieres = new ArrayList<>();
        String sql = "SELECT * FROM rel_produit_matiere WHERE id_produit = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1, this.getId());
        ResultSet res = prst.executeQuery();
        while(res.next()){
            idMatieres.add(res.getInt("id_matiere"));
        }
        con.close();
        prst.close();
        res.close();
        return idMatieres;
    }
    
    public static Produit getProduitById(int id)throws Exception{
        Produit produit = null;
        String sql = "SELECT * FROM produit WHERE id = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1 , id);
        ResultSet res = prst.executeQuery();
        if(res.next()){
            String nom = res.getString("nom");
            int id_article = res.getInt("id_article");
            int id_look = res.getInt("id_look");
            int id_taille = res.getInt("id_taille");
            int id_type = res.getInt("id_type");
            produit = new Produit(id , nom , id_article , id_look , id_taille , id_type);
        }
        con.close();
        prst.close();
        res.close();
        return produit;
    }
    
    public int getStockMatiere(int idMatiere)throws Exception{
       int qte = 0;
        String sql = "SELECT * FROM rel_matiere_stock where id_matiere = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, idMatiere);
        ResultSet res = st.executeQuery();
        if(res.next()){
            qte = res.getInt("nombre_stock");
        }
        res.close();
        st.close();
        con.close();
        return qte;
    }
    public int getStock()throws Exception{
       int qte = 0;
        String sql = "SELECT * FROM stock_produit where id_produit = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, this.getId());
        ResultSet res = st.executeQuery();
        if(res.next()){
            qte = res.getInt("nombre_stock");
        }
        res.close();
        st.close();
        con.close();
        return qte;
    }
    public void updateStock(int idMatiere , int qte)throws Exception{
        String sql = "UPDATE stock_matiere_premiere SET nombre_stock = ? WHERE id_matiere = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, qte);
        st.setInt(2, idMatiere);
        st.executeUpdate();
        st.close();
        con.close();
    }
    public void updateStock(int qte)throws Exception{
        String sql = "UPDATE stock_produit SET nombre_stock = ? WHERE id_produit = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, qte);
        st.setInt(2, this.getStock() - qte);
        st.executeUpdate();
        st.close();
        con.close();
    }
    
    public void doFabrication(int nombre)throws Exception{
        List<Integer> id_matieres = this.getMatieres();
        int count = 0;
        for(Integer id : id_matieres){
            int qte = this.getQteMatiere(id) * nombre;
            int stock = this.getStockMatiere(id);
            if(qte > stock){
                throw new Exception("Il n'y a pas assez de matiere "+id+" pour creer le produit");
            }else{
                count++;
            }
        }
        System.out.println(count);
                System.out.println(id_matieres);

        if(count == id_matieres.size()){
            for(Integer id_prod : id_matieres){
                this.updateStock(id_prod, this.getStockMatiere(id_prod) - this.getQteMatiere(id_prod) * nombre);
            }
        }
    }
    
    public static List<Integer> getProduitByIdArticle(int idArticle)throws Exception{
        List<Integer> integers = new ArrayList<>();
        String sql = "SELECT * FROM produit WHERE id_article=?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1, idArticle);
        ResultSet res = prst.executeQuery();
        while(res.next()){
            integers.add(res.getInt("id"));
        }
        prst.close();
        res.close();
        con.close();
        return integers;
    }
    public double getDepenseEmploye()throws Exception{
        double depense = this.getPriceById();
        String sql = "SELECT SUM (salaire_totale) AS somme FROM produit_fabrication_employe WHERE id_produit = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1, this.getId());
        ResultSet res = prst.executeQuery();
        if(res.next()){
            depense += res.getDouble("somme");
        }
        res.close();
        prst.close();
        con.close();
        return depense;
    }
    public double getPrixDeVente()throws Exception{
        double prix_vente = this.getPriceById();
        String sql = "SELECT prix_vente FROM produit_prix WHERE id_produit = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement prst = con.prepareStatement(sql);
        prst.setInt(1, this.getId());
        ResultSet res = prst.executeQuery();
        if(res.next()){
            prix_vente = res.getDouble("prix_vente");
        }
        res.close();
        prst.close();
        con.close();
        return prix_vente;
    }
    
    public double getPrixDeRevient()throws Exception{
        double prix_revient = 0;
        prix_revient += this.getPriceById() + this.getDepenseEmploye();
        return prix_revient;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public int getArticle() {
        return article;
    }
    public void setArticle(int article) {
        this.article = article;
    }
    public int getLook() {
        return look;
    }
    public void setLook(int look) {
        this.look = look;
    }
    public int getTaille() {
        return taille;
    }
    public void setTaille(int taille) {
        this.taille = taille;
    }
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
    public Date getDebutfabrication() {
        return debutfabrication;
    }
    public void setDebutfabrication(Date debutfabrication) {
        this.debutfabrication = debutfabrication;
    }
    public Date getFinfabrication() {
        return finfabrication;
    }
    public void setFinfabrication(Date finfabrication) {
        this.finfabrication = finfabrication;
    }

}

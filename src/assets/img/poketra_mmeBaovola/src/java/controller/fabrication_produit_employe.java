/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Produit;
import model.Produit_fabrication_employe;

/**
 *
 * @author LENOVO
 */
public class fabrication_produit_employe extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            int id_article = Integer.parseInt(request.getParameter("id_article"));
            List<Integer> integers = Produit.getProduitByIdArticle(id_article);
            int id_produit = -1;
            int id_employe = Integer.parseInt(request.getParameter("id_employe"));
            int id_fonction =1;
            double heure_travail = Double.parseDouble(request.getParameter("heure_travail"));
            double salaireParHeure = Double.parseDouble(request.getParameter("salaireParHeure"));
//            out.print("id_employe"+id_employe+)
            double salaireTotal = 0;
            int multiplicator = 1;
//            out.print(integers);
            for(int i = 0 ; i < integers.size() ; i++){
                id_produit = integers.get(i);
                heure_travail *= multiplicator;
                salaireParHeure *= multiplicator;
                salaireTotal = heure_travail * salaireParHeure;
                out.print("IDDDD: "+id_produit);
                Produit_fabrication_employe.insertProduitFabrication(id_produit, id_employe,id_fonction, heure_travail, salaireParHeure);
                multiplicator++;
            }
        }catch(Exception e){
            out.println("Erreur in fabrication produit employe "+e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

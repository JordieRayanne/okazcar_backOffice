/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.QuantiteMatiere;

/**
 *
 * @author Alex_Razakatoanina
 */
public class ValidationQuantite extends HttpServlet {

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
        
            String matiere = request.getParameter("matiere");
            String quantite = request.getParameter("quantite");
            String unite = request.getParameter("unite");
            String produit=request.getParameter("produit");

            int idMatiere=Integer.parseInt(matiere);
            double qt=Double.parseDouble(quantite);
            int idproduit=Integer.parseInt(produit);
        try {
            QuantiteMatiere qm=new QuantiteMatiere();
                qm.setProduit(idproduit);
                qm.setMatiere(idMatiere);
                qm.setQuantite(qt);
                qm.setUnite(unite);
                
                /*out.println("produit="+qm.getProduit());
                out.println("matiere="+qm.getMatiere());
                out.println("quantite="+qm.getQuantite());
                out.println("unite="+qm.getUnite());*/
                
                qm.insert(null);
            
                request.getRequestDispatcher("/look.jsp").forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            out.print("Error occured: "+e.getMessage());
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

/**
 *  Method to scroll page on search
 * 
 * @param String value 
 * 
 * @return void
 */

function getXMLHTTP()
{
    var xmlhttp=false;  
    try{
        xmlhttp=new XMLHttpRequest();
    }
    catch(e){
        try{
            xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e){
            try{
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e1){
                xmlhttp=false;
            }
        }
    }
    return xmlhttp;
}

function search(s) {            
    
    var value = s.value;

    var strURL="/career-library/all/get_search_list.php?value="+value;
        
    var req = getXMLHTTP();
    
    if (req) {
        
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                // only if "OK"
                if (req.status == 200) {    
                    document.getElementById("search_list").innerHTML = req.responseText;                                                
                } else {
                    alert("There was a problem while using XMLHTTP:\n" + req.statusText);
                }
            }               
        }           
        req.open("GET", strURL, true);
        req.send(null);
    }
}

function scrollDownCareerPath (value) {   
    
    //window.location.href = "/career-library/career-in-"+value; 
    
    /*try {
        alert(value);
        // Scroll to a certain element
        document.querySelector('[career-path-name="' + value + '"]').scrollIntoView({ 
            behavior: 'smooth' 
        });

        // remove hight class from each career-path if exists
        for (el of document.getElementsByTagName('li')) {
            if (el.classList.contains("highlight")) {
                el.classList.remove("highlight");
            }
        }

        // add hight class on scroll
        document.querySelector('[career-path-name="' + value + '"]').classList.add("highlight");

        document.getElementById('search-career-paths').innerHTML = null;
    } catch (err) {
        console.log (err.message);
    }*/
}

/**
 * Methos to design search list on search typeing
 * 
 * @param String search
 * 
 * @returns array
 */
function setSelectedCareerPath (careerPathScrollName, careerpathDisplayName) {
    try {
        document.getElementById ('search-input').value = careerpathDisplayName;
        document.getElementById ('search-input-hidden').value = careerPathScrollName;        
    } catch (err) {
        console.log (err.message);
    }
}

/**
 * 
 */
function scrollOnClick() {
    try {
        let career_cluster = document.getElementById ('search-input-hidden').value;

        // check if career-cluster is not empty
        if (career_cluster)
            scrollDownCareerPath (career_cluster);
    } catch (err) {
        console.log (err.message);
    } 
}

/**
 * Methos to generate career-cluster list on search type
 * 
 * @param String value 
 */
function designSearchList(value) {
    try {
        let list = document.getElementById ('career-cluster-list').getElementsByTagName('li');
        let search_keywords = [];

        for (i of list) {
            // fet all tags belongs to pointed career-path
            let i_tag = i.getAttribute ('search-keywords');
            
            // convert search-keywords into array
            let i_tag_array = (i_tag.split (',')).map (Function.prototype.call, String.prototype.trim);

            // check career-path-name is similar to given value
            if ((RegExp (value, 'i')).test (i.getAttribute ('career-path-name'))) {
                // add career-path into searcg array
                search_keywords[i.getAttribute ('career-path-name')] = i.getElementsByTagName('a')[0].innerText;
            }

            // check tag has similar values like given typed text
            for (t of i_tag_array) {
                if ((RegExp (value, 'i')).test (t)) {
                    // add career-path into searcg array
                    search_keywords[i.getAttribute ('career-path-name')] = i.getElementsByTagName('a')[0].innerText;
                }
            }
        }

        let search_career_paths_html = '';

        for (s in search_keywords) {
            var res1 = search_keywords[s];
            var res2 = res1.replace(" ", "-");
            var res = res2.toLowerCase();
            search_career_paths_html += '<li class="list-group-item text-capitalize" onClick="scrollDownCareerPath(\''+res+'\'); setSelectedCareerPath (\''+s+'\', \'' + search_keywords[s] + '\')">' + search_keywords[s] +'</li>';
            // search_career_paths_html += '<li class="list-group-item text-capitalize" onClick="scrollDownCareerPath(\''+s+'\')">' + search_keywords[s] +'</li>';
        }

        document.getElementById ('search-career-paths').innerHTML = search_career_paths_html;
    } catch (err) {
        console.log (err.message);
    }
}
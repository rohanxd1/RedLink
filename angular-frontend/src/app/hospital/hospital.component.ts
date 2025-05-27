import { Component, OnInit } from '@angular/core';
import { HospitalService,HospitalDto,HospitalEntity } from '../services/hospital.service';
@Component({
  selector: 'app-hospital',
  standalone: false,
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent implements OnInit
{
   constructor(private hospitalService: HospitalService) {}
   
   
  //  for view hosp thingies
   hospitals: HospitalDto[] = [];
   errorMessage: string | null = null;
   clearError(): void 
    {
      this.errorMessage = null;
    }
    ngOnInit(): void 
   {
      this.loadHospitals();
   }

  currentView: 'list' | 'edit' = 'list';

  loadHospitals(): void 
  {
    this.hospitalService.getAllHospitals().subscribe(
      data => this.hospitals = data,
      error => this.errorMessage = 'Failed to load hospitals.'
    );
  }


  
  editHospital()
  {
    // edit hospital button true aakanam
    this.currentView = 'edit';
  }

  
  //  for view hosp thingies end


  // hosp create overlay stuff
    showCreateOverlay=false;
    openOverlay()
    {
     
     this.showCreateOverlay=true;
    }
    closeCreateOverlay()
    {
      this.showCreateOverlay=false;
    }

    newHospital: HospitalEntity = 
      {
        
        hospitalName: '',
        hospitalCoordinator:'',
        hospitalPassword:'',
        hospitalPh: '',
        hospitalMail: '',
        hospitalAddress: ''
      };

    createError: string | null = null;
    createErrorOverlay=false;
    showCreateSuccessMessage = false;
    createHospital():void
    {
        if (
                !this.newHospital.hospitalName?.trim() ||
                !this.newHospital.hospitalCoordinator?.trim() ||
                !this.newHospital.hospitalPassword?.trim() ||
                !this.newHospital.hospitalPh?.trim() ||
                !this.newHospital.hospitalMail?.trim()||
                !this.newHospital.hospitalAddress?.trim()
           ) 
           {
              this.createError = 'All fields are required.';
              this.createErrorOverlay = true;
              return;
           }
        this.hospitalService.createHospital(this.newHospital).subscribe(
          {
             next: () => {
                          this.createErrorOverlay = false;
                          this.loadHospitals();
                          this.closeCreateOverlay();
                          this.showCreateSuccessMessage = true;
                          setTimeout(() => this.showCreateSuccessMessage = false, 3000);
                          this.newHospital = {
                                                hospitalName: '',
                                                hospitalCoordinator:'',
                                                hospitalPassword:'',
                                                hospitalPh: '',
                                                hospitalMail: '',
                                                hospitalAddress: ''
                                             };
                         },
              error: () => {
                            this.createError = "Failed to create donor";
                            this.createErrorOverlay = true;
                           }
          });

    }

  // hosp create overlay stuff

  // hosp edit mode parent overlay
    backToList()
    {
      this.currentView = 'list';  
      this.loadHospitals();
    }

    // Update hosp form thing 
    // button to open update hospital
    updateOverlay=false;
    selectedHospital :HospitalDto=
    {
      hospitalName: '',
      hospitalCoordinator:'',
      hospitalPh: '',
      hospitalMail: '',
      hospitalAddress: ''
    };
    updateId=0;
    openUpdateOverlay(hospital:HospitalDto)
    {
      this.updateOverlay=true;
      this.selectedHospital={...hospital};
       if(this.selectedHospital.hospitalId!==undefined)
            {
              this.updateId=this.selectedHospital.hospitalId;
            }
            else
            {
              console.error("hospital id is null");
            }
    }
    updateFailMessage=false;
    showUpdateSuccessMessage=false;
    updateHospital()
    {
      this.hospitalService.updateHospital(this.updateId,this.selectedHospital).subscribe
      (
        {
          next :()=>
          {
                      this.updateId=0;
                      this.updateOverlay=false;
                      this.backToList();
                      this.editHospital();
                      this.selectedHospital =  
                                          {
                                              hospitalName: '',
                                              hospitalCoordinator:'',
                                              hospitalPh: '',
                                              hospitalMail: '',
                                              hospitalAddress: ''
                                          };
                       this.showUpdateSuccessMessage=true;
                       setTimeout(()=>this.showUpdateSuccessMessage=false,3000);
          },
          error:()=>
          {
            this.updateFailMessage=true
          }
        }
      );
    }
    closeUpdateOverlay()
    {
             this.updateOverlay = false;
             this.updateFailMessage=false;
             this.selectedHospital = 
             {
               hospitalName: '',
               hospitalCoordinator:'',
               hospitalPh: '',
               hospitalMail: '',
               hospitalAddress: ''
             };
    }
    
    // Update hosp form thing over

    // Delete hosp form thing
    // button to open delete hospital
    deleteOverlay=false;
    deletedHospital :HospitalDto=
    {          
               hospitalId:0,
               hospitalName: '',
               hospitalCoordinator:'',
               hospitalPh: '',
               hospitalMail: '',
               hospitalAddress: ''
    };
    deleteId:number=0;
    openDeleteOverlay(hospital:HospitalDto)
    {
      this.deleteOverlay=true;
      this.deletedHospital=hospital;
      if(this.deletedHospital.hospitalId!=null)
      {
          this.deleteId=this.deletedHospital.hospitalId;
      }
      else 
      {
         console.error("Hospital ID is undefined.");
      }

    }
    closeDeleteOverlay()
    {
      this.deleteOverlay=false;
      this.deletedHospital=
      {
               hospitalId:0,
               hospitalName: '',
               hospitalCoordinator:'',
               hospitalPh: '',
               hospitalMail: '',
               hospitalAddress: ''
      };
    }
    showDeleteSuccessMessage=false;
    deleteFailMessage=false;
    deleteHospital()
    {
      this.hospitalService.deleteHospital(this.deleteId).subscribe
      (
        {
            next:()=>
              {
                this.deleteId=0;
                this.backToList();
                this.editHospital();
                this.deleteOverlay=false;
                this.showDeleteSuccessMessage=true;
                setTimeout(() => {
                                  this.showDeleteSuccessMessage = false;
                                 }, 3000);
              },
              error:()=>
              {
                this.deleteFailMessage=true;
              }
        }
      );
    }
    
    // Delete hosp form thing over


  // hosp edit mode parent overlay end

  // Search mode
    searchOverlay=false;
    searchIdInput:number|null=null;
    searchView=false;
    searchError=false;
    searchHospital:HospitalDto=
    {
               hospitalId:0,
               hospitalName: '',
               hospitalCoordinator:'',
               hospitalPh: '',
               hospitalMail: '',
               hospitalAddress: ''
    };
    searchButton()
    {
      // search true aakanam
      this.searchOverlay=true;
    }
    findHospital() 
    {
      this.searchError = false;
       this.searchView = false;

       // Reset result container
       this.searchHospital = {
       hospitalId: 0,
       hospitalName: '',
       hospitalCoordinator: '',
       hospitalPh: '',
       hospitalMail: '',
       hospitalAddress: ''
            };

        // Validate input
        if (this.searchIdInput === null || this.searchIdInput <= 0) 
          {
            this.searchError = true;
            return; // stop further execution
          }

        // Call backend
        this.hospitalService.findHospital(this.searchIdInput).subscribe
          (
            {
              next: (data) => 
              {
                    this.searchView = true;
                    this.searchError = false;
                    this.searchHospital = data;
              },
              error: (error) => 
              {
                // Handle 404 or any error
                 this.searchView = false;
                 this.searchError = true;
                 console.error("Error fetching hospital: ", error);
              }
            });
    }

    closeSearchOverlay()
    {       this.searchError = false;
            this.searchOverlay=false;
            this.searchView=false;
            this.searchIdInput = null;
            this.searchHospital=
            {
               hospitalId:0,
               hospitalName: '',
               hospitalCoordinator:'',
               hospitalPh: '',
               hospitalMail: '',
               hospitalAddress: ''
            };
             this.backToList();
    }
  // Search mode end
}

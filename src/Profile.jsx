import React, { useEffect, useState } from 'react'
import { useUser } from './contexts/UserContext';
import TagInput from './utilComponets/Taginput';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

const Profile = () => {

  const { user, setUser } = useUser();

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [gender, setGender] = useState('other');
  const [about, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [imageUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState(false);

  // const [skills, setBio] = useState('');
  useEffect(() => {
    if (user) {
      setfirstName(user.firstName || '');
      setlastName(user.lastName || '');
      setGender(user.gender || 'other');
      setBio(user.about || 'Please share something about you!!');
      setImgUrl(user.photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png");
      if (user?.skills) {
        setSkills(user.skills);
      }
      // setSkills(user.skills || []);
      // if user has profile pic: setPreviewImage(user.imageUrl)
    }
  }, [user]);
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillsChange = (updatedSkills) => {
    setSkills(updatedSkills);
    // Optionally update user object or save to API
  };

  const handelProfileUpdate = async ()=>{
    try{
      // const res = await axios.patch(BASE_URL + "profile/edit", {
      //   firstName,
      //   lastName,
      //   gender,
      //   about,
      //   skills
      // }, 
      // {withCredentials: true,}).then(res => {
      //   // console.log(res.data); 
      //   setUser(res.data.data);
      //   if(res.data.status === "success"){
      //     setStatus(true);
      //     setTimeout(() => {
      //       setStatus(false);
      //     }, 2000);
      //   }
      // });
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("about", about);
      // formData.append("skills", skills);
      skills.forEach((skill) => {
        formData.append('skills[]', skill);  // Use `skills[]` as key
      });
      
      if (previewImage) {
        formData.append("profileImage", imageFile);// Must match backend field name
      }

      const res = await axios.patch(BASE_URL + "profile/edit", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setUser(res.data.data);

      if (res.data.status === "success") {
        setStatus(true);
        setTimeout(() => setStatus(false), 2000);
      }

    }catch(err){
      console.log("Error: " + err);
    }

  }
  return (
    
    <div className="min-h-screen flex flex-col justify-between bg-base-100">
      
      <div className="flex justify-center pt-15">
        <div className="card bg-neutral text-primary-content w-full max-w-3xl shadow-lg my-4">
          <div className="card-body pb-0">
            <h2 className="card-title justify-center text-2xl mb-4">Personal Information</h2>
            {/* <form encType="multipart/form-data"> */}
            <div className="flex justify-center mb-4 relative group">
              <label htmlFor="profileImage" className="cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-400">
                  <img
                    src={previewImage || BASE_URL+imageUrl}
                    alt="Profile"
                    name="profileImage"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Edit icon overlay, visible only on hover */}
                <div className="absolute bottom-2 right-[calc(50%-12px)] bg-gray-700 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
                    />
                  </svg>
                </div>
              </label>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>


            <div className="flex gap-4 mb-4">

              <fieldset className="w-1/2 space-y-1">
                <legend className="text-sm font-semibold">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  placeholder="Type First Name"
                  onChange={(e)=>setfirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="w-1/2 space-y-1">
                <legend className="text-sm font-semibold">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  placeholder="Type Last Name"
                  onChange={(e)=>setlastName(e.target.value)}
                />
              </fieldset>

            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <div className="flex gap-6">
                {/* Male */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio radio-xs"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                  />
                  <span className="text-sm">Male</span>
                </label>

                {/* Female */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio radio-xs"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                  />
                  <span className="text-sm">Female</span>
                </label>

                {/* Other */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="radio radio-xs"
                    checked={gender === 'other'}
                    onChange={() => setGender('other')}
                  />
                  <span className="text-sm">Other</span>
                </label>
              </div>
            </div>

            <fieldset className="mb-2 space-y-1">
              <legend className="text-sm font-semibold">Bio</legend>
              <textarea
                type="text"
                value={about}
                className="textarea input-bordered w-full"
                placeholder="Type you bio"
                onChange={(e)=>setBio(e.target.value)}
              ></textarea>
            </fieldset>

            <TagInput initialTags={skills} onChange={handleSkillsChange} />
            
            <div className="card-actions mt-2 mb-6 justify-center">
              <button className="btn btn-info px-6" onClick={handelProfileUpdate}>Save Profile Info. </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
      {status && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Your profile is updated successfully!!!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
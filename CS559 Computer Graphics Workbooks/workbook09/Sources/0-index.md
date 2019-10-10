# Workbook 9: Fancier Textures and Lighting

This week we'll do some more texturing, trying out fancier versions of texturing and seeing how this works with lighting.

This workbook is due Friday, April 12th, with no assignments accepted after Monday, April 15th.

## Learning Goals

1. To learn about how local lighting is computed, and see how it is used in a practical system.
2. To learn about types of texturing beyond color maps, and see how they are used.
3. To see how lighting and texturing is used in a practical graphics system.
4. To try using various lighting and texturing features to create appearances.

## Recommended and Required Readings

Chapters 10 and 11 of Fundamentals of Computer Graphics are required.

Chapter 10 of Fundamentals of Computer Graphics ($cfile.FCG4_Ch10) has a concise but complete discussion of basic lighting. It is a great way to review what we discussed in class. Section 10.3 (Artistic Shading) is a more advanced topic, but interesting and will be discussed later in class. While lighting is not directly part of the exercises of the workbook, it is a topic that you will need to understand (both for programming and for the exams). We will also do more with it in coming weeks.

Chapter 11 of Fundamentals of Computer Graphics ($cfile.FCG4_Ch11) was a reading for last week. Sections 11.1 and 11.2 cover the basics of texture mapping. Section 11.3 discusses the filtering issues (as we talked about in class), including mip mapping and anisotropy. Section 11.4 talks (briefly) about the advanced texturing concepts in the exercises of this workbook.

Optional: Chapter 6 of Real-Time Rendering ($cfile.RTR4_Ch06) has more details about texturing than you probably want to know. It will tell you about many different kinds of mapping, lots of different algorithms for each different problems, and lots of pictures of how these things can be used in practice. It's fun to look at the pictures and be inspired about what kinds of cool stuff can be done.

Optional: Real-Time Rendering has a whole chapter on Shadows ($cfile.RTR4_Ch07). We'll only talk about Shadow Maps (Section 7.4). Even with Shadow Maps, the RTR book will give you more details than you could imagine, and tell you some things that they've done in recent games.

## Exercises

Pages 2, 3, 4, 5, and 6 all have exercises on them. They are pretty open ended: use some texturing feature in a scene. You need to make sure that you use the feature well enough that a grader can tell that the feature is in use. You may want to describe (in the text below the exercise and/or your README) what we should be seeing and why it shows off the feature.

In addition, across all the exercises (mainly 2-5 which use authored textures), you are required to use a diversity of textures. You will receive points (.5) if you use textures that fulfill the requirements and list them (and how they meet the requirements) in your readme. The requirements are:

1. A texture you made yourself by painting
2. A texture that you got from the web (document where you found it, and confirm that it is free to use)
3. A texture that is a photograph of a real object

In order to do all of these, you might need to put an extra object in one of your scenes.

Don't forget to include the textures you use in your repo and push them to GitHub!

It is OK to re-use code between exercises. You could potentially make one scene that does everything (and just load the same code onto each page). For each page, it should be clear which objects in the scene

Page 7 has an optional, bonus points only exercise.

### Rubric

You will score points for:

1. (P2) Using material surface property maps (.5pt)
2. (P3) Using a bump map (.5pt)
3. (P3) Using a normal map (.5pt)
4. (P4) Using a sky box (.5pt)
5. (P5) Using an Environment map (.5pt)
6. (P6) Spotlight Shadow (.5pt)
7. (P2-P5) Using a diversity of textures and documenting them correctly (.5pt) (the 3 kinds of textures above)

### Bonus Points

We may award "artistic bonus points" if you make a really cool and creative use of texture for one of the exercises (P2-P6). It will have to be more than just finding a good example on the web.

**Beyond Class Challenge:** In this workbook, there is an optional exercise that is purely for bonus points. While we'll talk about the idea of multi-pass rendering in class, we won't have time (before this workbook is due) to talk about the practical issues in implementing it in THREE. But, if you want to try it, it can make cool effects (like dynamic reflections) - but you will have to figure some things out on your own.

## Questions and the Exam

For this workbook, we won't grade the questions separately - they ask you what you've done for the exercises. We may use your answers in understanding your assignment.

There are no questions to test your knowledge of the concepts. However, for this (and all workbooks) you should expect questions on the exam. So make sure you really understand the concepts behind the workbook, even though we aren't checking your ability to answer questions (now).

## List of Pages

+ [Workbook 9: Fancier Textures and Lighting](index.html)
+ [Page 9-1 - Fancy Texturing](1-texturing.html)
+ [Page 9-2 - Material Property Maps](2-materials.html)
+ [Page 9-3 - Bump and Normal Maps](3-normal.html)
+ [Page 9-4 - Skyboxes](4-skybox.html)
+ [Page 9-5 - Environment Maps](5-environment.html)
+ [Page 9-6 - Shadow Maps](6-shadows.html)
+ [Page 9-7 - Multi-Pass Rendering](7-multipass.html)

## Get Started

Everything begins on [page one](1-texturing.html)
